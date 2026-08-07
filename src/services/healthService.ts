import { apiClient, IS_MOCK_MODE } from './apiClient';
import { MOCK_HEALTH_OVERVIEW } from './mockData';
import { HealthOverview } from '../types';

export const healthService = {
  async getHealthOverview(): Promise<HealthOverview> {
    if (IS_MOCK_MODE) {
      await new Promise((res) => setTimeout(res, 400));
      return MOCK_HEALTH_OVERVIEW;
    }
    return apiClient.get('/health/overview');
  },

  async syncVitals(): Promise<{ status: string; timestamp: string }> {
    if (IS_MOCK_MODE) {
      await new Promise((res) => setTimeout(res, 600));
      return { status: 'synced', timestamp: new Date().toISOString() };
    }
    return apiClient.post('/health/sync');
  },
};
