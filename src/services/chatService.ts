import { apiClient, IS_MOCK_MODE } from './apiClient';
import { ChatMessage } from '../types';

export const chatService = {
  async sendMessage(text: string): Promise<ChatMessage> {
    if (IS_MOCK_MODE) {
      await new Promise((res) => setTimeout(res, 800));
      return {
        id: `msg_ai_${Date.now()}`,
        sender: 'rakshak_ai',
        content: `I am keeping continuous watch. Your vitals are balanced and your next medicine is scheduled for 01:30 PM.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reasoningSteps: [
          'Evaluated query content against active elder profile',
          'Checked current vitals stream (Optimal)',
          'Formulated warm, reassuring voice response',
        ],
      };
    }
    return apiClient.post('/chat/message', { text });
  },
};
