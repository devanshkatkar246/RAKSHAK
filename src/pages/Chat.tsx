import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';
import { AIThinkingAnimation } from '../components/ui/AIThinkingAnimation';
import { useChatStore } from '../store/chatStore';
import { useRakshakVoice } from '../hooks/useRakshakVoice';
import {
  Bot,
  Sparkles,
  Heart,
  ShieldCheck,
  Lock,
  MessageCircle,
  Pill,
  TrendingUp,
  BookOpen,
  Bell,
  Send,
  Volume2,
  ChevronRight,
  Activity,
  ArrowDown,
  Smile,
} from 'lucide-react';

interface AgentNodeData {
  id: string;
  name: string;
  role: string;
  icon: any;
  status: 'active' | 'processing' | 'idle';
  confidence: number;
  currentTask: string;
  lastDecision: string;
  responsibilities: string[];
  inputs: string[];
  outputs: string[];
  currentReasoning: string[];
}

export const Chat: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<AgentNodeData | null>(null);
  const [activeTab, setActiveTab] = useState<'network' | 'pipeline' | 'chat'>('chat');
  const { messages, isThinking, activeReasoningSteps, sendMessage, isVoiceActive, toggleVoiceMode } = useChatStore();
  const { speak } = useRakshakVoice();

  const suggestedPrompts = [
    'How are my vitals today?',
    'Why do I take Amlodipine in the morning?',
    'Did you block any scam calls today?',
    'I am feeling a little lonely right now',
  ];

  const companionInsights = [
    {
      icon: Heart,
      title: 'Proactive Health Check',
      text: 'Your morning resting pulse (72 BPM) and BP (122/78) are perfectly stable.',
    },
    {
      icon: Pill,
      title: 'Medication Guidance',
      text: 'Metformin 500mg is scheduled for 01:30 PM with your lunch.',
    },
    {
      icon: Lock,
      title: 'Scam Protection Active',
      text: '1 telemarketer fraud call was auto-blocked yesterday. Your OTP shield is active.',
    },
    {
      icon: Smile,
      title: 'Emotional Care',
      text: 'Suggested calling daughter Priya this afternoon for a warm family chat.',
    },
  ];

  const agents: AgentNodeData[] = [
    {
      id: 'supervisor',
      name: 'Supervisor Agent',
      role: 'LangGraph Orchestrator & Intent Classifier',
      icon: Bot,
      status: 'active',
      confidence: 98,
      currentTask: 'Orchestrating 9 sub-agents & monitoring vitals stream',
      lastDecision: 'Routed query to Health + Medication agents in parallel',
      responsibilities: [
        'Classify user intent & telemetry triggers',
        'Route tasks across 9 specialist agents',
        'Synthesize multi-agent outputs into single response',
        'Escalate high-risk incidents to Emergency pipeline',
      ],
      inputs: ['User voice/text prompt', 'Real-time vitals snapshot', 'Agent outputs'],
      outputs: ['Unified agent response', 'Confidence score', 'Suggested actions'],
      currentReasoning: [
        'Analyzed input: "How are my vitals today?"',
        'Identified intent: health_query (confidence: 0.98)',
        'Fanned out parallel requests to HealthMonitoringAgent and MedicationAgent',
      ],
    },
    {
      id: 'health',
      name: 'Health AI Agent',
      role: 'Vitals Telemetry & Anomaly Detection',
      icon: Heart,
      status: 'active',
      confidence: 96,
      currentTask: 'Analyzing morning heart rate stream (72 BPM)',
      lastDecision: 'Classified risk: Optimal. No intervention required.',
      responsibilities: [
        'Continuous analysis of HR, BP, SpO2, Temp',
        'Compare readings to 30-day baseline',
        'JNC-8 blood pressure risk classification',
      ],
      inputs: ['Wearable BLE stream', 'Historical baselines', 'Age/Gender profile'],
      outputs: ['Risk level (optimal/critical)', 'AI health commentary'],
      currentReasoning: [
        'HR reading 72 BPM is within normal range (60-100)',
        'SpO2 reading 98% indicates healthy oxygenation',
      ],
    },
    {
      id: 'safety',
      name: 'Safety AI Agent',
      role: 'Fall Detection & Smart Home Security',
      icon: ShieldCheck,
      status: 'active',
      confidence: 100,
      currentTask: 'Monitoring accelerometer & smart lock status',
      lastDecision: 'Environment secure. Zero fall events detected.',
      responsibilities: [
        'Tri-axial accelerometer fall detection',
        'Inactivity monitoring during active hours',
        'Smart door lock & motion sensor validation',
      ],
      inputs: ['Watch accelerometer data', 'Smart home door sensors'],
      outputs: ['Fall alert trigger', 'Inactivity status'],
      currentReasoning: [
        'No high-g impact forces registered',
        'Motion detected in kitchen at 08:15 AM',
      ],
    },
    {
      id: 'financial',
      name: 'Financial AI Agent',
      role: 'Anti-Scam & Telemarketer Shield',
      icon: Lock,
      status: 'active',
      confidence: 99,
      currentTask: 'Incoming call screening & OTP fraud shield',
      lastDecision: 'Auto-blocked 1 spam scam call (+91 98201 02938)',
      responsibilities: [
        'Screen unknown incoming phone numbers',
        'Detect financial scam keywords in SMS',
        'Protect bank OTP credentials from phishing',
      ],
      inputs: ['Call logs', 'SMS messages', 'Telecom spam database'],
      outputs: ['Call block action', 'Scam alert notification'],
      currentReasoning: [
        'Matched incoming number against TRAI spam registry',
        'Automatically executed call rejection rule',
      ],
    },
    {
      id: 'emotional',
      name: 'Emotional AI Agent',
      role: 'Mood & Family Connection Nudge',
      icon: MessageCircle,
      status: 'active',
      confidence: 92,
      currentTask: 'Evaluating social interaction patterns',
      lastDecision: 'Recommended afternoon walk & call with Priya',
      responsibilities: [
        'Track frequency of family interactions',
        'Analyze voice tone for stress or loneliness',
        'Provide gentle wellness & social nudges',
      ],
      inputs: ['Chat sentiment', 'Call frequency logs', 'Activity metrics'],
      outputs: ['Emotional wellness score', 'Social connection suggestions'],
      currentReasoning: [
        'Last interaction with daughter Priya was 3 days ago',
        'Formulated gentle suggestion card for elder',
      ],
    },
    {
      id: 'medication',
      name: 'Medication Agent',
      role: 'Schedule Adherence & Interaction Check',
      icon: Pill,
      status: 'active',
      confidence: 95,
      currentTask: 'Tracking afternoon dose schedule (Metformin 500mg)',
      lastDecision: 'Morning Amlodipine 5mg logged on time at 08:00 AM',
      responsibilities: [
        'Maintain prescription schedule and reminders',
        'Check drug-drug and drug-food interactions',
        'Track pill count and generate refill alerts',
      ],
      inputs: ['Dose logs', 'Prescription DB', 'Food intake timing'],
      outputs: ['Contextual reminders', 'Interaction warnings'],
      currentReasoning: [
        'Amlodipine taken at 08:00 AM with water',
        'Next dose due in 18 minutes: Metformin 500mg with lunch',
      ],
    },
    {
      id: 'prediction',
      name: 'Prediction Agent',
      role: 'Telemetry Forecasting & Early Risk',
      icon: TrendingUp,
      status: 'idle',
      confidence: 91,
      currentTask: 'Updating 7-day vitals forecasting model',
      lastDecision: 'Predicted stable vitals pattern for next 48 hours',
      responsibilities: [
        'Forecast vitals trends using time-series AI',
        'Detect gradual degradation before acute symptoms',
      ],
      inputs: ['7-day vitals trend', 'Weather data', 'Sleep quality'],
      outputs: ['Risk prediction score', 'Proactive care plan'],
      currentReasoning: ['Calculated 48-hr stability index: 0.94'],
    },
    {
      id: 'knowledge',
      name: 'Knowledge Agent (RAG)',
      role: 'WHO Guidelines & Medical KB Search',
      icon: BookOpen,
      status: 'active',
      confidence: 94,
      currentTask: 'pgvector semantic search over WHO hypertension guidelines',
      lastDecision: 'Retrieved 2 relevant medical KB chunks with citations',
      responsibilities: [
        'Vector search over medical PDFs and drug monographs',
        'Translate clinical terminology into simple elder language',
        'Provide evidence-backed citations',
      ],
      inputs: ['Semantic query string', 'pgvector database'],
      outputs: ['Retrieved context chunks', 'Source citations'],
      currentReasoning: [
        'Executed similarity search on query "Amlodipine food guidelines"',
        'Retrieved WHO monograph section 4.2',
      ],
    },
    {
      id: 'notification',
      name: 'Notification Agent',
      role: 'Multi-Channel Routing & DND Enforcement',
      icon: Bell,
      status: 'idle',
      confidence: 97,
      currentTask: 'Routing notifications based on priority & DND window',
      lastDecision: 'Routed morning vitals summary to Push + In-App',
      responsibilities: [
        'Route alerts to Push, SMS, or Voice call',
        'Localize notification text into Hindi/English',
        'Enforce DND windows for low-priority alerts',
      ],
      inputs: ['Notification payload', 'User preferences', 'Time of day'],
      outputs: ['Twilio SMS', 'Firebase FCM Push', 'TTS Call'],
      currentReasoning: ['Determined priority: MEDIUM -> Routed via Push'],
    },
  ];

  const pipelineSteps = [
    { step: 1, title: 'Telemetry Trigger Ingested', agent: 'Wearable Sensor', detail: 'Heart rate spikes to 102 BPM while resting at 10:14 AM', icon: Activity },
    { step: 2, title: 'Health Agent Analysis', agent: 'Health AI Agent', detail: 'Cross-referenced against 30-day resting baseline (68-74 BPM). Flagged elevated HR.', icon: Heart },
    { step: 3, title: 'Medication Adherence Validation', agent: 'Medication Agent', detail: 'Checked morning dose log: Amlodipine 5mg taken at 08:00 AM. Excluded missed dose.', icon: Pill },
    { step: 4, title: 'Acute Risk Forecasting', agent: 'Prediction Agent', detail: 'Calculated acute hypertension risk: 0.12 (Low). No chest pain or dizziness reported.', icon: TrendingUp },
    { step: 5, title: 'Medical KB Protocol Check', agent: 'Knowledge Agent (RAG)', detail: 'Queried WHO guidelines: Resting HR 102 BPM without symptoms requires 15-min rest check.', icon: BookOpen },
    { step: 6, title: 'Supervisor Decision Orchestration', agent: 'Supervisor Agent', detail: 'Formulated non-alarming voice check-in: "Savitri ji, please rest for 10 minutes and drink water."', icon: Bot },
    { step: 7, title: 'Multi-Channel Notification', agent: 'Notification Agent', detail: 'Dispatched soft push notification to elder & updated family daily digest log.', icon: Bell },
    { step: 8, title: 'Dashboard & Vitals Refresh', agent: 'System State', detail: 'Updated live telemetry grid and logged event in 24-hr Guardian Timeline.', icon: ShieldCheck },
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;
    setInputText('');
    await sendMessage(text);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-geist pb-12">
      <SectionHeader
        title="Proactive AI Companion & Operations Center"
        subtitle="Compassionate voice-first AI companion backed by a multi-agent system."
        badgeText="Rakshak Companion Active"
        action={
          <div className="flex items-center gap-1.5 p-1 rounded-buttons bg-canvas border border-hairline">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1 text-xs font-medium rounded-buttons transition-colors cursor-pointer ${
                activeTab === 'chat' ? 'bg-ink text-paper' : 'text-mid-gray hover:text-ink'
              }`}
            >
              Caring Companion Console
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`px-3 py-1 text-xs font-medium rounded-buttons transition-colors cursor-pointer ${
                activeTab === 'network' ? 'bg-ink text-paper' : 'text-mid-gray hover:text-ink'
              }`}
            >
              Agent Network
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1 text-xs font-medium rounded-buttons transition-colors cursor-pointer ${
                activeTab === 'pipeline' ? 'bg-ink text-paper' : 'text-mid-gray hover:text-ink'
              }`}
            >
              Reasoning Pipeline
            </button>
          </div>
        }
      />

      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <GlassCard className="lg:col-span-2 p-6 space-y-4 min-h-[500px] flex flex-col justify-between">
            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-lg p-4 rounded-cards text-sm leading-relaxed border ${
                      msg.sender === 'user'
                        ? 'bg-ink text-paper border-transparent rounded-br-none'
                        : 'bg-canvas text-ink border-hairline rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5 border-b border-hairline/20 pb-1">
                      <span className="text-[11px] font-semibold uppercase tracking-caption text-mid-gray">
                        {msg.sender === 'user' ? 'You' : 'Rakshak Guardian Companion'}
                      </span>
                      {msg.sender === 'rakshak_ai' && (
                        <button
                          onClick={() => speak(msg.content)}
                          className="p-1 text-mid-gray hover:text-ink transition-colors cursor-pointer"
                          title="Read aloud"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p>{msg.content}</p>
                  </div>
                  <span className="text-[10px] text-mid-gray mt-1 px-1 font-mono">{msg.timestamp}</span>
                </div>
              ))}

              {isThinking && <AIThinkingAnimation reasoningSteps={activeReasoningSteps} />}
            </div>

            {messages.length < 4 && (
              <div className="pt-2">
                <p className="text-xs font-medium text-mid-gray mb-2">Suggested Conversation Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="px-3 py-1.5 rounded-buttons bg-canvas hover:bg-hairline border border-hairline text-xs font-medium text-ink transition-colors cursor-pointer text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-3 border-t border-hairline">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to your Rakshak companion..."
                className="flex-1 bg-canvas border border-hairline rounded-inputs px-4 py-2.5 text-sm text-ink placeholder:text-mid-gray focus:outline-none focus:border-ink transition-colors font-geist"
              />
              <GradientButton
                variant={isVoiceActive ? 'primary' : 'glass'}
                size="md"
                onClick={toggleVoiceMode}
              >
                Voice
              </GradientButton>
              <GradientButton
                variant="primary"
                size="md"
                onClick={() => handleSend()}
                rightIcon={<Send className="w-4 h-4" />}
              >
                Send
              </GradientButton>
            </div>
          </GlassCard>

          <div className="space-y-3 lg:col-span-1">
            <h3 className="text-base font-semibold text-ink">Proactive Companion Insights</h3>
            {companionInsights.map((insight, idx) => {
              const Icon = insight.icon;
              return (
                <GlassCard key={idx} className="p-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-buttons bg-canvas border border-hairline text-ink">
                      <Icon className="w-3.5 h-3.5 stroke-[1.75]" />
                    </div>
                    <h4 className="text-xs font-semibold text-ink">{insight.title}</h4>
                  </div>
                  <p className="text-xs text-mid-gray leading-normal">{insight.text}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'network' && (
        <div className="space-y-6">
          <GlassCard className="p-6 border-ink bg-paper shadow-subtle">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-buttons bg-ink text-paper flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-ink">Supervisor Agent (LangGraph)</h3>
                    <StatusBadge status="optimal" label="Orchestrating" size="sm" />
                  </div>
                  <p className="text-xs text-mid-gray mt-0.5 max-w-xl">
                    Central intent classifier and graph router executing parallel sub-agent calls and synthesizing final responses.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <GradientButton
                  variant="primary"
                  size="sm"
                  leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                  onClick={() => setSelectedAgent(agents[0])}
                >
                  Inspect Supervisor Graph
                </GradientButton>
              </div>
            </div>
          </GlassCard>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-caption text-mid-gray mb-3 px-1">
              Active Specialist Agent Nodes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.slice(1).map((agent) => {
                const Icon = agent.icon;
                return (
                  <GlassCard
                    key={agent.id}
                    glowOnHover
                    onClick={() => setSelectedAgent(agent)}
                    className="p-5 flex flex-col justify-between cursor-pointer group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-buttons bg-canvas border border-hairline group-hover:border-mid-gray/40 transition-colors">
                          <Icon className="w-4 h-4 text-ink stroke-[1.75]" />
                        </div>
                        <StatusBadge
                          status={agent.status === 'active' ? 'optimal' : 'stable'}
                          label={agent.status}
                          size="sm"
                        />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-ink group-hover:underline">
                          {agent.name}
                        </h4>
                        <p className="text-[11px] text-mid-gray mt-0.5 leading-tight">{agent.role}</p>
                      </div>

                      <div className="p-2.5 rounded-buttons bg-canvas border border-hairline text-xs space-y-1">
                        <p className="text-[10px] uppercase font-semibold text-mid-gray font-mono">Current Task</p>
                        <p className="text-xs text-ink leading-tight">{agent.currentTask}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-hairline mt-3 flex items-center justify-between text-xs text-mid-gray">
                      <span>Confidence: {agent.confidence}%</span>
                      <span className="text-ink font-medium flex items-center gap-0.5">
                        Inspect <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pipeline' && (
        <GlassCard className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <div>
              <h3 className="text-base font-semibold text-ink">Multi-Agent Reasoning Pipeline Execution</h3>
              <p className="text-xs text-mid-gray mt-0.5">Sequential observation, analysis, decision, and response flow</p>
            </div>
            <span className="text-xs text-mid-gray font-mono">Simulated Real-Time Trace</span>
          </div>

          <div className="space-y-4">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-full flex items-start gap-4 p-4 rounded-cards bg-canvas border border-hairline">
                    <div className="w-8 h-8 rounded-buttons bg-ink text-paper flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-ink">{step.title}</h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-paper border border-hairline text-mid-gray">
                            {step.agent}
                          </span>
                        </div>
                        <Icon className="w-4 h-4 text-mid-gray stroke-[1.75]" />
                      </div>
                      <p className="text-xs text-mid-gray leading-relaxed">{step.detail}</p>
                    </div>
                  </div>

                  {idx < pipelineSteps.length - 1 && (
                    <ArrowDown className="w-4 h-4 text-mid-gray my-1.5" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      )}

      <Modal
        isOpen={!!selectedAgent}
        onClose={() => setSelectedAgent(null)}
        title={selectedAgent?.name}
        description={selectedAgent?.role}
        className="max-w-2xl"
      >
        {selectedAgent && (
          <div className="space-y-4 pt-2 text-xs font-geist">
            <div className="flex items-center justify-between p-3 rounded-buttons bg-canvas border border-hairline">
              <div>
                <span className="text-mid-gray uppercase tracking-caption">Node Status</span>
                <p className="font-semibold text-ink mt-0.5 capitalize">{selectedAgent.status}</p>
              </div>
              <div className="text-right">
                <span className="text-mid-gray uppercase tracking-caption">Confidence Score</span>
                <p className="font-mono font-semibold text-ink mt-0.5">{selectedAgent.confidence}%</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-ink mb-1.5">Primary Agent Responsibilities:</h4>
              <ul className="space-y-1 list-disc pl-4 text-mid-gray">
                {selectedAgent.responsibilities.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-buttons bg-canvas border border-hairline space-y-1">
                <p className="font-semibold text-ink">Inputs:</p>
                <ul className="list-disc pl-4 text-mid-gray">
                  {selectedAgent.inputs.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-buttons bg-canvas border border-hairline space-y-1">
                <p className="font-semibold text-ink">Outputs:</p>
                <ul className="list-disc pl-4 text-mid-gray">
                  {selectedAgent.outputs.map((o, idx) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3.5 rounded-buttons bg-canvas border border-hairline space-y-1.5 font-mono">
              <p className="font-semibold text-ink flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-ink" /> Reasoning Execution Trace:
              </p>
              {selectedAgent.currentReasoning.map((step, idx) => (
                <p key={idx} className="text-mid-gray">
                  &gt; {step}
                </p>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Chat;
