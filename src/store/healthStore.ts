import { create } from 'zustand';
import { HealthOverview, VitalMetric } from '../types';

interface HealthState {
  overview: HealthOverview;
  isSyncing: boolean;
  lastSyncedAt: string;
  updateVital: (type: VitalMetric['type'], value: number | string) => void;
  syncVitals: () => Promise<void>;
}

const INITIAL_HEALTH_OVERVIEW: HealthOverview = {
  overallScore: 94,
  status: 'optimal',
  statusMessage: 'Vitals stable. Heart rate & SpO2 in normal range.',
  lastAssessmentTime: '10 mins ago',
  heartRate: {
    id: 'vital_hr',
    type: 'heart_rate',
    label: 'Heart Rate',
    value: 72,
    unit: 'BPM',
    trend: 'stable',
    trendValue: 'Normal rhythm',
    risk: 'optimal',
    lastUpdated: '5m ago',
    history: [
      { time: '06:00', value: 65 },
      { time: '09:00', value: 74 },
      { time: '12:00', value: 78 },
      { time: '15:00', value: 72 },
      { time: '18:00', value: 70 },
      { time: '21:00', value: 72 },
    ],
  },
  bloodPressure: {
    id: 'vital_bp',
    type: 'blood_pressure',
    label: 'Blood Pressure',
    value: '122/78',
    unit: 'mmHg',
    trend: 'stable',
    trendValue: 'Optimal',
    risk: 'optimal',
    lastUpdated: '15m ago',
    history: [
      { time: '06:00', value: 120 },
      { time: '09:00', value: 125 },
      { time: '12:00', value: 122 },
      { time: '15:00', value: 121 },
      { time: '18:00', value: 122 },
    ],
  },
  spo2: {
    id: 'vital_spo2',
    type: 'spo2',
    label: 'Oxygen Saturation',
    value: 98,
    unit: '%',
    trend: 'up',
    trendValue: '+1%',
    risk: 'optimal',
    lastUpdated: '2m ago',
    history: [
      { time: '06:00', value: 97 },
      { time: '09:00', value: 98 },
      { time: '12:00', value: 98 },
      { time: '15:00', value: 99 },
      { time: '18:00', value: 98 },
    ],
  },
  sleep: {
    id: 'vital_sleep',
    type: 'sleep',
    label: 'Sleep Quality',
    value: 7.8,
    unit: 'hrs',
    trend: 'up',
    trendValue: '86% Deep Sleep',
    risk: 'optimal',
    lastUpdated: 'Today',
    history: [
      { time: 'Mon', value: 6.5 },
      { time: 'Tue', value: 7.2 },
      { time: 'Wed', value: 7.0 },
      { time: 'Thu', value: 8.1 },
      { time: 'Fri', value: 7.8 },
    ],
  },
  steps: {
    id: 'vital_steps',
    type: 'steps',
    label: 'Daily Activity',
    value: 3420,
    unit: 'steps',
    trend: 'up',
    trendValue: '68% of daily goal',
    risk: 'optimal',
    lastUpdated: '1m ago',
    history: [
      { time: 'Mon', value: 2800 },
      { time: 'Tue', value: 4100 },
      { time: 'Wed', value: 3900 },
      { time: 'Thu', value: 3100 },
      { time: 'Fri', value: 3420 },
    ],
  },
};

export const useHealthStore = create<HealthState>((set) => ({
  overview: INITIAL_HEALTH_OVERVIEW,
  isSyncing: false,
  lastSyncedAt: new Date().toISOString(),
  updateVital: (type, value) =>
    set((state) => {
      const keyMap: Record<VitalMetric['type'], keyof HealthOverview> = {
        heart_rate: 'heartRate',
        blood_pressure: 'bloodPressure',
        spo2: 'spo2',
        sleep: 'sleep',
        steps: 'steps',
        temperature: 'heartRate',
        glucose: 'heartRate',
      };
      const key = keyMap[type];
      if (!key || typeof state.overview[key] !== 'object') return state;

      const currentVital = state.overview[key] as VitalMetric;
      return {
        overview: {
          ...state.overview,
          [key]: {
            ...currentVital,
            value,
            lastUpdated: 'Just now',
          },
        },
      };
    }),
  syncVitals: async () => {
    set({ isSyncing: true });
    await new Promise((res) => setTimeout(res, 1200));
    set({
      isSyncing: false,
      lastSyncedAt: new Date().toISOString(),
    });
  },
}));
