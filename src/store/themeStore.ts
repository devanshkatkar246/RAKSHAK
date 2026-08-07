import { create } from 'zustand';

interface ThemeState {
  highContrastMode: boolean;
  largeFontMode: boolean;
  soundEnabled: boolean;
  toggleHighContrast: () => void;
  toggleLargeFont: () => void;
  toggleSound: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  highContrastMode: false,
  largeFontMode: false,
  soundEnabled: true,
  toggleHighContrast: () => set((state) => ({ highContrastMode: !state.highContrastMode })),
  toggleLargeFont: () => set((state) => ({ largeFontMode: !state.largeFontMode })),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));
