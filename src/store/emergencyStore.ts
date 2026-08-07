import { create } from 'zustand';
import { EmergencyContact, SOSAlertState } from '../types';

interface EmergencyState {
  alertState: SOSAlertState;
  contacts: EmergencyContact[];
  triggerSOS: () => void;
  cancelSOS: () => void;
  decrementCountdown: () => void;
  resolveSOS: () => void;
}

const DEFAULT_CONTACTS: EmergencyContact[] = [
  {
    id: 'contact_01',
    name: 'Rajesh Sharma',
    relation: 'Son (Primary Guardian)',
    phone: '+91 98123 45678',
    isPrimary: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'contact_02',
    name: 'Priya Sharma',
    relation: 'Daughter-in-law',
    phone: '+91 98234 56789',
    isPrimary: false,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'contact_03',
    name: 'Dr. Vikram Patel',
    relation: 'Family Cardiologist',
    phone: '+91 98980 12345',
    isPrimary: false,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
  },
];

export const useEmergencyStore = create<EmergencyState>((set) => ({
  alertState: {
    status: 'idle',
    countdownSeconds: 5,
    emergencyContactsNotified: [],
  },
  contacts: DEFAULT_CONTACTS,
  triggerSOS: () =>
    set({
      alertState: {
        status: 'triggered',
        triggeredAt: new Date().toISOString(),
        countdownSeconds: 5,
        location: {
          latitude: 19.076,
          longitude: 72.8777,
          address: 'B-402 Green Meadows, Bandra West, Mumbai',
        },
        emergencyContactsNotified: [],
      },
    }),
  cancelSOS: () =>
    set({
      alertState: {
        status: 'cancelled',
        countdownSeconds: 5,
        emergencyContactsNotified: [],
      },
    }),
  decrementCountdown: () =>
    set((state) => {
      const current = state.alertState.countdownSeconds;
      if (current <= 1) {
        return {
          alertState: {
            ...state.alertState,
            status: 'notifying',
            countdownSeconds: 0,
            emergencyContactsNotified: state.contacts.map((c) => c.id),
          },
        };
      }
      return {
        alertState: {
          ...state.alertState,
          countdownSeconds: current - 1,
        },
      };
    }),
  resolveSOS: () =>
    set({
      alertState: {
        status: 'idle',
        countdownSeconds: 5,
        emergencyContactsNotified: [],
      },
    }),
}));
