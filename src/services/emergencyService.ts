import { apiClient, IS_MOCK_MODE } from './apiClient';
import { MOCK_EMERGENCY_CONTACTS } from './mockData';
import { EmergencyContact } from '../types';

export const emergencyService = {
  async triggerSOSAlert(payload: { latitude?: number; longitude?: number }): Promise<{ alertId: string }> {
    if (IS_MOCK_MODE) {
      await new Promise((res) => setTimeout(res, 300));
      return { alertId: `sos_${Date.now()}` };
    }
    return apiClient.post('/sos/trigger', payload);
  },

  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    if (IS_MOCK_MODE) {
      await new Promise((res) => setTimeout(res, 250));
      return MOCK_EMERGENCY_CONTACTS;
    }
    return apiClient.get('/sos/contacts');
  },
};
