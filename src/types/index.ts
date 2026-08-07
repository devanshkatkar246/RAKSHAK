export type UserRole = 'elderly' | 'caregiver' | 'doctor' | 'family_member';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  role: UserRole;
  avatarUrl?: string;
  phone: string;
  emergencyContactPhone: string;
  primaryCondition?: string;
  address?: string;
  guardianAgentName: string;
  bloodGroup?: string;
}

export type HealthRiskLevel = 'optimal' | 'stable' | 'caution' | 'critical';

export interface VitalMetric {
  id: string;
  type: 'heart_rate' | 'blood_pressure' | 'spo2' | 'sleep' | 'steps' | 'temperature' | 'glucose';
  label: string;
  value: number | string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  risk: HealthRiskLevel;
  lastUpdated: string;
  history: Array<{ time: string; value: number }>;
}

export interface HealthOverview {
  overallScore: number; // 0 - 100
  status: HealthRiskLevel;
  statusMessage: string;
  heartRate: VitalMetric;
  bloodPressure: VitalMetric;
  spo2: VitalMetric;
  sleep: VitalMetric;
  steps: VitalMetric;
  lastAssessmentTime: string;
}

export type MedicationStatus = 'taken' | 'pending' | 'missed' | 'skipped';

export interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  scheduledTime: string; // e.g. "08:00 AM"
  status: MedicationStatus;
  instructions: string;
  pillColorHex?: string;
  remainingPills: number;
  totalPills: number;
}

export interface MedicationSchedule {
  todayAdherenceRate: number; // 0 - 100
  medications: MedicationItem[];
  nextDose?: MedicationItem;
}

export type SOSAlertStatus = 'idle' | 'triggered' | 'notifying' | 'resolved' | 'cancelled';

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isPrimary: boolean;
  avatarUrl?: string;
}

export interface SOSAlertState {
  status: SOSAlertStatus;
  triggeredAt?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  countdownSeconds: number;
  alertId?: string;
  emergencyContactsNotified: string[]; // contact IDs
}

export type ChatSender = 'user' | 'rakshak_ai' | 'system';

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  content: string;
  timestamp: string;
  isAudioAvailable?: boolean;
  reasoningSteps?: string[];
  suggestedActions?: Array<{ label: string; action: string }>;
  vitalAlertRef?: string;
}

export interface GuardianAgentState {
  name: string;
  status: 'active_guarding' | 'analyzing_vitals' | 'responding' | 'idle';
  lastCheckinTime: string;
  confidenceScore: number;
  activeInsights: string[];
}
