import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Avatar } from '../components/ui/Avatar';
import { useEmergencyStore } from '../store/emergencyStore';
import {
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
  CheckCircle,
  MapPin,
  Lock,
  PhoneOff,
  Sparkles,
  Stethoscope,
  Building2,
} from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  category: 'health' | 'financial';
  trigger: string;
  severity: number;
  responseLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  agentWorkflow: string[];
  familyAction: string;
  aiExplanation: string;
}

export const SOS: React.FC = () => {
  const { alertState, contacts, triggerSOS, cancelSOS, decrementCountdown, resolveSOS } =
    useEmergencyStore();
  const [activeTab, setActiveTab] = useState<'emergency' | 'financial' | 'simulations'>('emergency');
  const [activeSimulation, setActiveSimulation] = useState<SimulationScenario | null>(null);
  const [simStep, setSimStep] = useState(0);

  const scenarios: SimulationScenario[] = [
    {
      id: 'fall',
      name: 'Fall Detected',
      category: 'health',
      trigger: 'Apple Watch accelerometer 3.2g impact force + zero motion for 15s',
      severity: 0.95,
      responseLevel: 'CRITICAL',
      agentWorkflow: [
        'Safety Agent ingests impact telemetry (3.2g)',
        'Health Agent verifies pulse (88 BPM, steady)',
        'Supervisor Agent classifies CRITICAL Fall Event',
        'Emergency Agent initiates 5s cancellation grace window',
        'Auto-dispatched voice call to Rajesh (Son) & Dr. Patel',
      ],
      familyAction: 'Voice call + SMS sent to Rajesh Sharma with live GPS link.',
      aiExplanation: 'Abrupt deceleration followed by immobility triggered fall protocol. Verified no severe head trauma metrics.',
    },
    {
      id: 'chest_pain',
      name: 'Chest Pain (Voice SOS)',
      category: 'health',
      trigger: 'Elder spoke keyword "I am feeling heavy chest pain"',
      severity: 0.98,
      responseLevel: 'CRITICAL',
      agentWorkflow: [
        'Voice NLP engine detects acute symptom "chest pain"',
        'Health Agent checks HR (98 BPM) & BP (142/90 mmHg)',
        'Knowledge Agent retrieves cardiac emergency protocol',
        'Supervisor Agent bypasses grace window → Dispatches 108 Ambulance',
        'Family notified via priority phone call',
      ],
      familyAction: 'Immediate automated call to Rajesh Sharma & Lilavati Hospital ER.',
      aiExplanation: 'Spoken cardiac distress keywords combined with elevated BP (142/90) triggered immediate ambulance dispatch.',
    },
    {
      id: 'dizziness',
      name: 'Hypertension Dizziness',
      category: 'health',
      trigger: 'BP reading 158/98 mmHg + elder reported dizziness',
      severity: 0.75,
      responseLevel: 'HIGH',
      agentWorkflow: [
        'Health Agent flags Stage-2 Hypertension reading (158/98)',
        'Medication Agent checks last dose: Amlodipine taken at 08:00 AM',
        'Supervisor Agent routes to Health Monitoring Agent',
        'Formulated rest advice & dispatched push alert to family',
      ],
      familyAction: 'Push notification & SMS sent to Rajesh: "Savitri ji experiencing elevated BP (158/98). Resting now."',
      aiExplanation: 'Stage-2 BP reading detected. Recommended lying down with feet elevated while alerting family guardian.',
    },
    {
      id: 'no_movement',
      name: 'No Movement (Inactivity)',
      category: 'health',
      trigger: 'Zero room motion detected for 120 minutes during awake hours',
      severity: 0.65,
      responseLevel: 'MODERATE',
      agentWorkflow: [
        'Safety Agent detects 120min quiet window (11:00 AM - 01:00 PM)',
        'Health Agent checks pulse stream (66 BPM, resting)',
        'Supervisor Agent initiates soft audio ping on smart speaker',
        'Elder acknowledged with "I am reading a book"',
      ],
      familyAction: 'No alert sent to family — elder safely acknowledged soft check-in.',
      aiExplanation: 'Inactivity window resolved via gentle audio check-in. Elder confirmed resting safely.',
    },
    {
      id: 'manual_sos',
      name: 'Manual Panic Button',
      category: 'health',
      trigger: 'Elder pressed physical SOS button on wristband',
      severity: 0.90,
      responseLevel: 'HIGH',
      agentWorkflow: [
        'Emergency Agent receives hardware SOS interrupt signal',
        'Supervisor Agent broadcasts GPS location to emergency list',
        'Dispatched SMS to all 3 family guardians simultaneously',
      ],
      familyAction: 'SMS & Push alert sent to Rajesh, Priya, and Dr. Patel.',
      aiExplanation: 'Manual panic button pressed. Live location link shared with all designated guardians.',
    },
    {
      id: 'fraud_call',
      name: 'Fake Electricity Bill Call',
      category: 'financial',
      trigger: 'Incoming call from unverified number (+91 98201 02938)',
      severity: 0.85,
      responseLevel: 'HIGH',
      agentWorkflow: [
        'Financial Agent intercepts incoming call',
        'Query TRAI & Rakshak scam database: Number flagged for Fraud',
        'Financial Agent auto-rejects call before phone rings',
        'Supervisor Agent logs attempt & prepares daily digest',
      ],
      familyAction: 'Soft digest log created for evening family report.',
      aiExplanation: 'Scam telemarketer attempting electricity disconnection scam auto-blocked. Elder remained undisturbed.',
    },
    {
      id: 'otp_scam',
      name: 'Bank OTP Phishing Scam',
      category: 'financial',
      trigger: 'Caller requested 6-digit bank OTP during phone call',
      severity: 0.95,
      responseLevel: 'CRITICAL',
      agentWorkflow: [
        'Financial Agent voice monitor detects phrase "share your OTP"',
        'Audio alert played on phone: "WARNING! NEVER SHARE YOUR OTP"',
        'Call terminated immediately by Financial Agent',
        'Supervisor Agent locks bank OTP input & alerts family',
      ],
      familyAction: 'Urgent SMS to Rajesh: "Rakshak blocked an OTP phishing attempt on Savitri ji\'s phone."',
      aiExplanation: 'OTP solicitation detected during call. Terminated call instantly to protect bank account credentials.',
    },
    {
      id: 'fake_sms',
      name: 'Fake Bank Account SMS',
      category: 'financial',
      trigger: 'SMS received: "Your bank account will be blocked. Click http://bit.ly/bank-fake"',
      severity: 0.80,
      responseLevel: 'HIGH',
      agentWorkflow: [
        'Financial Agent scans incoming SMS payload',
        'NLP link analyzer flags unverified bit.ly phishing URL',
        'SMS moved to Spam Quarantine folder',
        'Family guardian notified of blocked phishing SMS',
      ],
      familyAction: 'Quarantine log updated. Family notified in daily security summary.',
      aiExplanation: 'Phishing URL in SMS detected and quarantined before elder could click.',
    },
  ];

  const nearbyHospitals = [
    { name: 'Holy Family Hospital', distance: '1.2 km', phone: '022-26421551', address: 'St. Andrew Road, Bandra West', erStatus: 'Open 24/7 • ER Ready' },
    { name: 'Lilavati Hospital & Research Centre', distance: '2.8 km', phone: '022-26751000', address: 'A-791, Bandra Reclamation', erStatus: 'Open 24/7 • Trauma Center' },
    { name: 'Bhabha Municipal Hospital', distance: '1.5 km', phone: '022-26422775', address: 'Waterfield Road, Bandra West', erStatus: 'Open 24/7 • Emergency Ward' },
  ];

  const blockedScams = [
    { time: 'Yesterday 04:15 PM', caller: '+91 98201 02938', type: 'Fake Disconnection Scam', risk: 'High Fraud', status: 'Auto-Blocked' },
    { time: 'Aug 4, 11:20 AM', caller: '+91 99100 84920', type: 'Credit Card Limit Upgrade Phishing', risk: 'High Fraud', status: 'Auto-Blocked' },
    { time: 'Aug 2, 02:45 PM', caller: '+91 98112 04910', type: 'Lottery Prize Claim Scam', risk: 'Medium Fraud', status: 'Quarantined' },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (alertState.status === 'triggered' && alertState.countdownSeconds > 0) {
      timer = setInterval(() => {
        decrementCountdown();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [alertState.status, alertState.countdownSeconds, decrementCountdown]);

  const runSimulation = (scenario: SimulationScenario) => {
    setActiveSimulation(scenario);
    setSimStep(0);

    const interval = setInterval(() => {
      setSimStep((prev) => {
        if (prev >= scenario.agentWorkflow.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-geist pb-12">
      <SectionHeader
        title="Emergency & Security Command Center"
        subtitle="Multi-channel SOS emergency dispatch, real-time fall detection, and Financial Anti-Scam protection."
        badgeText="Guard Active 24/7"
        action={
          <div className="flex items-center gap-1.5 p-1 rounded-buttons bg-canvas border border-hairline">
            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-3 py-1 text-xs font-medium rounded-buttons transition-colors cursor-pointer ${
                activeTab === 'emergency' ? 'bg-ink text-paper' : 'text-mid-gray hover:text-ink'
              }`}
            >
              Emergency Command
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`px-3 py-1 text-xs font-medium rounded-buttons transition-colors cursor-pointer ${
                activeTab === 'financial' ? 'bg-ink text-paper' : 'text-mid-gray hover:text-ink'
              }`}
            >
              Financial Guardian
            </button>
            <button
              onClick={() => setActiveTab('simulations')}
              className={`px-3 py-1 text-xs font-medium rounded-buttons transition-colors cursor-pointer ${
                activeTab === 'simulations' ? 'bg-ink text-paper' : 'text-mid-gray hover:text-ink'
              }`}
            >
              AI Simulation Studio
            </button>
          </div>
        }
      />

      {activeTab === 'emergency' && (
        <div className="space-y-6">
          <GlassCard accentBorder="danger" className="p-8 text-center space-y-6 border-ember bg-paper shadow-subtle">
            <div className="flex flex-col items-center justify-center">
              <motion.div
                animate={
                  alertState.status === 'triggered'
                    ? { scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }
                    : {}
                }
                transition={{ duration: 1, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-ember text-paper flex items-center justify-center mb-4 shadow-subtle cursor-pointer"
                onClick={alertState.status === 'idle' ? triggerSOS : undefined}
              >
                <AlertTriangle className="w-12 h-12 stroke-[2]" />
              </motion.div>

              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink font-geist">
                {alertState.status === 'triggered'
                  ? `Dispatching SOS in ${alertState.countdownSeconds}s...`
                  : alertState.status === 'notifying'
                  ? 'Emergency Contacts & Ambulance Dispatched!'
                  : alertState.status === 'cancelled'
                  ? 'Emergency Alert Standby'
                  : 'Tap SOS for Instant Emergency Dispatch'}
              </h3>

              <p className="text-sm text-mid-gray max-w-md mt-2 flex items-center justify-center gap-1.5 font-mono">
                <MapPin className="w-4 h-4 text-ink shrink-0" />
                Lat: 19.0596, Lon: 72.8295 • B-402 Green Meadows, Bandra West, Mumbai
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              {alertState.status === 'idle' || alertState.status === 'cancelled' ? (
                <GradientButton
                  variant="danger"
                  size="xl"
                  fullWidth
                  leftIcon={<ShieldAlert className="w-5 h-5" />}
                  onClick={triggerSOS}
                >
                  TRIGGER IMMEDIATE SOS
                </GradientButton>
              ) : alertState.status === 'triggered' ? (
                <GradientButton variant="secondary" size="lg" fullWidth onClick={cancelSOS}>
                  CANCEL ALERT (False Alarm)
                </GradientButton>
              ) : (
                <GradientButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={<CheckCircle className="w-4 h-4" />}
                  onClick={resolveSOS}
                >
                  Mark Safe & Resolved
                </GradientButton>
              )}
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-ink">Designated Emergency Guardians</h3>
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <GlassCard key={contact.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar src={contact.avatarUrl} name={contact.name} size="md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-ink">{contact.name}</h4>
                          {contact.isPrimary && <StatusBadge status="optimal" label="Primary" size="sm" />}
                        </div>
                        <p className="text-xs text-mid-gray mt-0.5">{contact.relation}</p>
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="p-2 rounded-buttons bg-canvas border border-hairline text-ink hover:bg-hairline/60 transition-colors"
                      aria-label={`Call ${contact.name}`}
                    >
                      <PhoneCall className="w-4 h-4 stroke-[1.75]" />
                    </a>
                  </GlassCard>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-ink">Nearby ER & Trauma Centers</h3>
              <div className="space-y-3">
                {nearbyHospitals.map((hosp, idx) => (
                  <GlassCard key={idx} className="p-4 flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-ink shrink-0" />
                        <h4 className="text-sm font-semibold text-ink">{hosp.name}</h4>
                      </div>
                      <p className="text-xs text-mid-gray">{hosp.address} • <strong className="text-ink">{hosp.distance}</strong></p>
                      <p className="text-[11px] font-mono text-mid-gray mt-0.5">{hosp.erStatus}</p>
                    </div>
                    <a
                      href={`tel:${hosp.phone}`}
                      className="p-2 rounded-buttons bg-canvas border border-hairline text-ink hover:bg-hairline/60 transition-colors shrink-0"
                    >
                      <PhoneCall className="w-4 h-4 stroke-[1.75]" />
                    </a>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>

          <GlassCard className="p-6 space-y-3">
            <h3 className="text-base font-semibold text-ink border-b border-hairline pb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-ink" /> Paramedic & First Responder Medical Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-buttons bg-canvas border border-hairline">
                <span className="text-mid-gray uppercase tracking-caption">Blood Group</span>
                <p className="text-base font-semibold text-ink mt-0.5">O Positive (O+)</p>
              </div>
              <div className="p-3 rounded-buttons bg-canvas border border-hairline">
                <span className="text-mid-gray uppercase tracking-caption">Known Allergies</span>
                <p className="text-base font-semibold text-ember mt-0.5">Penicillin (Severe)</p>
              </div>
              <div className="p-3 rounded-buttons bg-canvas border border-hairline">
                <span className="text-mid-gray uppercase tracking-caption">Active Conditions</span>
                <p className="text-base font-semibold text-ink mt-0.5">Hypertension, Type-2 Diabetes</p>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'financial' && (
        <div className="space-y-6">
          <GlassCard className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-buttons bg-ink text-paper flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-ink">Financial Anti-Scam Shield</h3>
                  <StatusBadge status="optimal" label="Scam Risk: 0/100" size="sm" />
                </div>
                <p className="text-sm text-mid-gray mt-1 leading-relaxed max-w-xl">
                  Real-time screening of unknown calls, SMS OTP phishing detection, and automatic telemarketer scam blocking.
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-hairline pt-4 sm:pt-0 sm:pl-6 shrink-0">
              <span className="text-xs text-mid-gray uppercase tracking-caption">Scams Blocked This Month</span>
              <p className="text-3xl font-semibold text-ink mt-0.5">14 Calls / SMS</p>
            </div>
          </GlassCard>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-ink">Blocked Telemarketer & Scam Log</h3>
            <div className="space-y-2.5">
              {blockedScams.map((scam, idx) => (
                <GlassCard key={idx} className="p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-buttons bg-canvas border border-hairline text-ember">
                      <PhoneOff className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold font-mono text-ink">{scam.caller}</span>
                        <StatusBadge status="critical" label={scam.status} size="sm" />
                      </div>
                      <p className="text-mid-gray mt-0.5">{scam.type} • <span className="font-mono">{scam.time}</span></p>
                    </div>
                  </div>
                  <span className="text-mid-gray font-mono hidden sm:inline">{scam.risk}</span>
                </GlassCard>
              ))}
            </div>
          </div>

          <GlassCard className="p-6 space-y-3">
            <h4 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-ink" /> How Financial Guardian Collaborates With Supervisor Agent
            </h4>
            <p className="text-xs text-mid-gray leading-relaxed">
              When a suspicious call or OTP request is intercepted, the <strong>Financial AI Agent</strong> analyzes the threat locally, rejects the call, and notifies the <strong>Supervisor Agent</strong>. The Supervisor Agent evaluates whether the incident requires immediate family notification or inclusion in the daily evening health & safety digest.
            </p>
          </GlassCard>
        </div>
      )}

      {activeTab === 'simulations' && (
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-base font-semibold text-ink mb-1">Interactive AI Scenario Simulation Studio</h3>
            <p className="text-xs text-mid-gray">Select any emergency or scam scenario below to test the full agentic workflow in real-time.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => runSimulation(sc)}
                  className={`p-3 rounded-buttons border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                    activeSimulation?.id === sc.id
                      ? 'bg-ink text-paper border-transparent'
                      : 'bg-canvas text-ink border-hairline hover:bg-hairline/60'
                  }`}
                >
                  <span className="text-xs font-semibold leading-tight">{sc.name}</span>
                  <span className={`text-[10px] font-mono ${activeSimulation?.id === sc.id ? 'text-paper/80' : 'text-mid-gray'}`}>
                    {sc.category === 'health' ? 'Health Emergency' : 'Financial Threat'}
                  </span>
                </button>
              ))}
            </div>
          </GlassCard>

          {activeSimulation && (
            <GlassCard className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <div>
                  <h4 className="text-base font-semibold text-ink">Active Simulation: {activeSimulation.name}</h4>
                  <p className="text-xs text-mid-gray mt-0.5">{activeSimulation.trigger}</p>
                </div>
                <StatusBadge
                  status={activeSimulation.responseLevel === 'CRITICAL' ? 'critical' : 'optimal'}
                  label={`Severity: ${activeSimulation.severity}`}
                  size="sm"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-mid-gray uppercase tracking-caption">Agent Workflow Execution Trace:</p>
                {activeSimulation.agentWorkflow.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: idx <= simStep ? 1 : 0.4, x: 0 }}
                    className={`p-3 rounded-buttons border text-xs font-mono flex items-center justify-between ${
                      idx <= simStep ? 'bg-canvas text-ink border-hairline' : 'bg-paper text-mid-gray border-hairline/40'
                    }`}
                  >
                    <span>&gt; Step {idx + 1}: {step}</span>
                    {idx <= simStep && <CheckCircle className="w-3.5 h-3.5 text-ink shrink-0 ml-2" />}
                  </motion.div>
                ))}
              </div>

              <div className="p-4 rounded-buttons bg-canvas border border-hairline space-y-2 text-xs">
                <p><strong className="text-ink">AI Decision Reasoning:</strong> {activeSimulation.aiExplanation}</p>
                <p><strong className="text-ink">Family Guardian Action:</strong> {activeSimulation.familyAction}</p>
              </div>
            </GlassCard>
          )}
        </div>
      )}
    </div>
  );
};

export default SOS;
