export const ROUTES = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  CHAT: '/chat',
  HEALTH: '/health',
  MEDICATIONS: '/medications',
  SOS: '/sos',
  FAMILY: '/family',
  REPORTS: '/reports',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
