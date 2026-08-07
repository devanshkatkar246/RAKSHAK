import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from './Modal';
import { GradientButton } from './GradientButton';
import { StatusBadge } from './StatusBadge';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Sparkles,
  Pill,
  Lock,
  MessageCircle,
  AlertTriangle,
  MapPin,
  Building2,
  FileText,
  ShieldCheck,
  Sun,
} from 'lucide-react';

interface DemoStep {
  id: number;
  time: string;
  title: string;
  category: 'Health' | 'Medication' | 'Security' | 'Emotional' | 'Emergency';
  icon: any;
  description: string;
  agentAction: string;
  familyNotification: string;
  status: 'completed' | 'in_progress' | 'upcoming';
}

interface DemoModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModeModal: React.FC<DemoModeModalProps> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const demoSteps: DemoStep[] = [
    {
      id: 1,
      time: '07:00 AM',
      title: 'Good Morning Greeting & Sleep Ingest',
      category: 'Health',
      icon: Sun,
      description: 'Savitri ji woke up after 7.8 hours of restful sleep (92% quality index).',
      agentAction: 'Health AI Agent ingested Apple Watch sleep metrics and generated daily baseline.',
      familyNotification: 'Included in morning family summary log.',
      status: 'completed',
    },
    {
      id: 2,
      time: '08:00 AM',
      title: 'Morning Vitals Check & Pill Taken',
      category: 'Medication',
      icon: Pill,
      description: 'Resting HR: 72 BPM, BP: 122/78 mmHg. Morning Amlodipine 5mg dose logged on time.',
      agentAction: 'Medication Agent verified pill schedule and updated daily adherence score to 100%.',
      familyNotification: 'No alert needed — routine dose taken on schedule.',
      status: 'completed',
    },
    {
      id: 3,
      time: '10:15 AM',
      title: 'Financial Anti-Scam Shield Active',
      category: 'Security',
      icon: Lock,
      description: 'Incoming fake electricity disconnection scam call (+91 98201 02938) intercepted.',
      agentAction: 'Financial AI Agent cross-referenced TRAI registry and auto-rejected call before ring.',
      familyNotification: 'Added to evening security report digest.',
      status: 'completed',
    },
    {
      id: 4,
      time: '11:30 AM',
      title: 'Proactive AI Voice Check-in',
      category: 'Emotional',
      icon: Sparkles,
      description: 'Elder completed 1,850-step morning walk around society garden.',
      agentAction: 'Emotional AI Agent provided warm audio check-in on smart speaker.',
      familyNotification: 'Logged positive elder sentiment.',
      status: 'completed',
    },
    {
      id: 5,
      time: '01:30 PM',
      title: 'Afternoon Diabetes Dose Logged',
      category: 'Medication',
      icon: Pill,
      description: 'Metformin HCl 500mg taken with lunch as prescribed by Dr. Patel.',
      agentAction: 'Medication Agent verified lunch timing and logged dose.',
      familyNotification: 'Adherence log updated.',
      status: 'completed',
    },
    {
      id: 6,
      time: '03:30 PM',
      title: 'Family Connection Nudge',
      category: 'Emotional',
      icon: MessageCircle,
      description: 'AI noticed 3 days since last conversation with daughter Priya.',
      agentAction: 'Supervisor Agent fanned out gentle social prompt card on main dashboard.',
      familyNotification: 'Family digest updated with social connection reminder.',
      status: 'completed',
    },
    {
      id: 7,
      time: '05:45 PM',
      title: 'Simulated Fall Impact Event',
      category: 'Emergency',
      icon: AlertTriangle,
      description: 'Apple Watch accelerometer registered 3.2g impact force in living room.',
      agentAction: 'Safety Agent initiated 5-second emergency cancellation grace window.',
      familyNotification: 'Priority SMS alert queued.',
      status: 'in_progress',
    },
    {
      id: 8,
      time: '05:46 PM',
      title: 'GPS Location Broadcasted',
      category: 'Emergency',
      icon: MapPin,
      description: 'Live coordinates broadcasted: Lat: 19.0596, Lon: 72.8295 (Bandra West).',
      agentAction: 'Emergency Agent auto-dialed Rajesh Sharma (Son) & Dr. Vikram Patel.',
      familyNotification: 'Rajesh received priority phone call + live GPS tracking link.',
      status: 'in_progress',
    },
    {
      id: 9,
      time: '05:47 PM',
      title: 'Nearest ER Hospital Identified',
      category: 'Emergency',
      icon: Building2,
      description: 'Holy Family Hospital ER (1.2 km away) identified as primary trauma center.',
      agentAction: 'Knowledge Agent retrieved trauma protocol & pre-notified ER desk.',
      familyNotification: 'Hospital dispatch details shared with family guardians.',
      status: 'in_progress',
    },
    {
      id: 10,
      time: '05:48 PM',
      title: 'Incident Audit Report Generated',
      category: 'Emergency',
      icon: FileText,
      description: 'Complete emergency audit report compiled with paramedic medical summary.',
      agentAction: 'Notification Agent compiled PDF report card & updated risk history.',
      familyNotification: 'Full incident report archived in Family Portal.',
      status: 'in_progress',
    },
    {
      id: 11,
      time: '06:00 PM',
      title: 'Resolution & Dashboard Refresh',
      category: 'Health',
      icon: ShieldCheck,
      description: 'Elder confirmed safe after family check-in. Vitals returned to baseline.',
      agentAction: 'Supervisor Agent resolved SOS state and refreshed Command Center score.',
      familyNotification: 'Final safety clearance sent to all guardians.',
      status: 'completed',
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= demoSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500 / speedMultiplier);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier, demoSteps.length]);

  const currentStep = demoSteps[currentStepIndex];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🎬 Hackathon Presentation Studio — 24-Hour Automated Demo"
      description="Live end-to-end simulation of Rakshak AI Guardian protecting Savitri ji across a complete day."
      className="max-w-3xl"
    >
      <div className="space-y-6 pt-2 font-geist">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-cards bg-canvas border border-hairline">
          <div className="flex items-center gap-2">
            <GradientButton
              variant="primary"
              size="sm"
              leftIcon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'Pause Simulation' : 'Start 24-Hr Demo Run'}
            </GradientButton>

            <GradientButton
              variant="ghost"
              size="sm"
              leftIcon={<RotateCcw className="w-4 h-4" />}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
            >
              Reset
            </GradientButton>

            <GradientButton
              variant="ghost"
              size="sm"
              leftIcon={<SkipForward className="w-4 h-4" />}
              onClick={() => setCurrentStepIndex((prev) => Math.min(prev + 1, demoSteps.length - 1))}
            >
              Next Step
            </GradientButton>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-mid-gray">
            <span>Speed:</span>
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2 py-0.5 rounded ${
                  speedMultiplier === spd ? 'bg-ink text-paper font-semibold' : 'bg-paper text-mid-gray border border-hairline'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-mid-gray">
            <span>Progress: Step {currentStepIndex + 1} of {demoSteps.length}</span>
            <span>{currentStep.time} — {currentStep.category}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-canvas border border-hairline overflow-hidden">
            <motion.div
              className="h-full bg-ink"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStepIndex + 1) / demoSteps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-cards bg-paper border border-hairline shadow-subtle space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-buttons bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  {currentStep.time}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-ink">{currentStep.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas border border-hairline text-mid-gray">
                    {currentStep.category} Domain
                  </span>
                </div>
              </div>
              <StatusBadge
                status={currentStep.category === 'Emergency' ? 'critical' : 'optimal'}
                label={currentStep.category === 'Emergency' ? 'Incident Active' : 'Normal Protocol'}
                size="sm"
              />
            </div>

            <p className="text-sm text-ink leading-relaxed font-medium">
              "{currentStep.description}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-buttons bg-canvas border border-hairline space-y-1">
                <span className="text-mid-gray font-semibold uppercase tracking-caption">AI Agent Execution:</span>
                <p className="text-ink leading-normal">{currentStep.agentAction}</p>
              </div>
              <div className="p-3 rounded-buttons bg-canvas border border-hairline space-y-1">
                <span className="text-mid-gray font-semibold uppercase tracking-caption">Family Caregiver Action:</span>
                <p className="text-ink leading-normal">{currentStep.familyNotification}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
};
