export const RAKSHAK_COLORS = {
  canvas: '#f5f5f5',
  paper: '#ffffff',
  surfaceAlt: '#fafafa',
  ink: '#0a0a0a',
  inkSoft: '#171717',
  midGray: '#737373',
  hairline: '#e5e5e5',
  ember: '#e7000b',
} as const;

export const VITAL_THRESHOLDS = {
  HEART_RATE: { min: 60, max: 100 },
  BLOOD_PRESSURE_SYS: { min: 90, max: 130 },
  BLOOD_PRESSURE_DIA: { min: 60, max: 85 },
  SPO2: { min: 95, max: 100 },
};
