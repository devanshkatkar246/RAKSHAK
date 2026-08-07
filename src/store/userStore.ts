import { create } from 'zustand';
import { UserProfile, UserRole } from '../types';

interface UserState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
}

const DEFAULT_MOCK_USER: UserProfile = {
  id: 'usr_elder_01',
  name: 'Savitri Sharma',
  age: 74,
  gender: 'female',
  role: 'elderly',
  phone: '+91 98765 43210',
  emergencyContactPhone: '+91 98123 45678',
  primaryCondition: 'Hypertension & Mild Diabetes',
  address: 'B-402, Green Meadows Apartments, Bandra, Mumbai',
  guardianAgentName: 'Rakshak AI Guardian',
  bloodGroup: 'O+',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
};

export const useUserStore = create<UserState>((set) => ({
  user: DEFAULT_MOCK_USER,
  isAuthenticated: true,
  isLoading: false,
  login: async (_email, role) => {
    set({ isLoading: true });
    // Simulate auth API latency
    await new Promise((res) => setTimeout(res, 800));
    set({
      user: { ...DEFAULT_MOCK_USER, role },
      isAuthenticated: true,
      isLoading: false,
    });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  updateProfile: (partial) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : null,
    })),
}));
