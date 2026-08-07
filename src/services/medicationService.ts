import { apiClient, IS_MOCK_MODE } from './apiClient';
import { MOCK_MEDICATION_SCHEDULE } from './mockData';
import { MedicationSchedule } from '../types';

export const medicationService = {
  async getSchedule(): Promise<MedicationSchedule> {
    if (IS_MOCK_MODE) {
      await new Promise((res) => setTimeout(res, 400));
      return MOCK_MEDICATION_SCHEDULE;
    }
    return apiClient.get('/medications/schedule');
  },

  async logDose(medicationId: string, status: 'taken' | 'skipped'): Promise<{ success: boolean }> {
    if (IS_MOCK_MODE) {
      await new Promise((res) => setTimeout(res, 300));
      return { success: true };
    }
    return apiClient.post(`/medications/${medicationId}/log`, { status });
  },
};
