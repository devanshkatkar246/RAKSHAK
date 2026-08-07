import { create } from 'zustand';
import { MedicationItem, MedicationSchedule, MedicationStatus } from '../types';

interface MedicationState {
  schedule: MedicationSchedule;
  markAsTaken: (id: string) => void;
  markAsSkipped: (id: string) => void;
  addMedication: (item: Omit<MedicationItem, 'id' | 'status'>) => void;
}

const INITIAL_MEDICATIONS: MedicationItem[] = [
  {
    id: 'med_01',
    name: 'Amlodipine Besylate',
    dosage: '5 mg',
    frequency: 'Once Daily',
    scheduledTime: '08:00 AM',
    status: 'taken',
    instructions: 'Take after breakfast with water.',
    pillColorHex: '#FF6B4A',
    remainingPills: 22,
    totalPills: 30,
  },
  {
    id: 'med_02',
    name: 'Metformin HCl',
    dosage: '500 mg',
    frequency: 'Twice Daily',
    scheduledTime: '01:30 PM',
    status: 'pending',
    instructions: 'Take during or after lunch.',
    pillColorHex: '#14B8A6',
    remainingPills: 14,
    totalPills: 60,
  },
  {
    id: 'med_03',
    name: 'Atorvastatin Calcium',
    dosage: '10 mg',
    frequency: 'Nightly',
    scheduledTime: '09:00 PM',
    status: 'pending',
    instructions: 'Take before sleep.',
    pillColorHex: '#3B82F6',
    remainingPills: 28,
    totalPills: 30,
  },
];

export const useMedicationStore = create<MedicationState>((set) => ({
  schedule: {
    todayAdherenceRate: 88,
    medications: INITIAL_MEDICATIONS,
    nextDose: INITIAL_MEDICATIONS[1],
  },
  markAsTaken: (id) =>
    set((state) => {
      const updated = state.schedule.medications.map((m) =>
        m.id === id ? { ...m, status: 'taken' as MedicationStatus, remainingPills: Math.max(0, m.remainingPills - 1) } : m
      );
      const takenCount = updated.filter((m) => m.status === 'taken').length;
      const rate = Math.round((takenCount / updated.length) * 100);
      const next = updated.find((m) => m.status === 'pending');

      return {
        schedule: {
          todayAdherenceRate: rate,
          medications: updated,
          nextDose: next,
        },
      };
    }),
  markAsSkipped: (id) =>
    set((state) => {
      const updated = state.schedule.medications.map((m) =>
        m.id === id ? { ...m, status: 'skipped' as MedicationStatus } : m
      );
      const next = updated.find((m) => m.status === 'pending');
      return {
        schedule: {
          ...state.schedule,
          medications: updated,
          nextDose: next,
        },
      };
    }),
  addMedication: (item) =>
    set((state) => {
      const newMed: MedicationItem = {
        ...item,
        id: `med_${Date.now()}`,
        status: 'pending',
      };
      const updated = [...state.schedule.medications, newMed];
      return {
        schedule: {
          ...state.schedule,
          medications: updated,
        },
      };
    }),
}));
