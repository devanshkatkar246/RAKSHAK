import { create } from 'zustand';
import { ChatMessage, GuardianAgentState } from '../types';

interface ChatState {
  messages: ChatMessage[];
  guardianAgent: GuardianAgentState;
  isVoiceActive: boolean;
  isThinking: boolean;
  activeReasoningSteps: string[];
  sendMessage: (content: string) => Promise<void>;
  toggleVoiceMode: () => void;
  clearChat: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_01',
    sender: 'rakshak_ai',
    content: 'Namaste Savitri ji! 🙏 I am Rakshak, your AI Guardian. Your vitals look wonderful today. How are you feeling right now?',
    timestamp: '08:30 AM',
    reasoningSteps: [
      'Analyzed morning heart rate (72 BPM) & SpO2 (98%)',
      'Checked Amlodipine medication log (Taken at 08:00 AM)',
      'Constructed warm, elder-friendly morning greeting',
    ],
    suggestedActions: [
      { label: 'I feel great today', action: 'feel_great' },
      { label: 'Remind me of my afternoon pill', action: 'remind_pill' },
      { label: 'Check my heart rate trend', action: 'check_vitals' },
    ],
  },
];

export const useChatStore = create<ChatState>((set, get) => ({
  messages: INITIAL_MESSAGES,
  guardianAgent: {
    name: 'Rakshak Digital Guardian',
    status: 'active_guarding',
    lastCheckinTime: 'Just now',
    confidenceScore: 99.4,
    activeInsights: [
      'Heart rate rhythm within healthy baseline (68-76 BPM)',
      'Morning hypertension pill taken on time',
    ],
  },
  isVoiceActive: false,
  isThinking: false,
  activeReasoningSteps: [],
  toggleVoiceMode: () => set((state) => ({ isVoiceActive: !state.isVoiceActive })),
  clearChat: () => set({ messages: [] }),
  sendMessage: async (content: string) => {
    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      isThinking: true,
      activeReasoningSteps: [
        'Processing elder user voice/text input',
        'Cross-referencing medical context & active vitals',
        'Evaluating emergency / alert condition triggers',
        'Synthesizing compassionate response',
      ],
    }));

    // Simulate AI Guardian reasoning delay
    await new Promise((res) => setTimeout(res, 1400));

    const aiMsg: ChatMessage = {
      id: `msg_ai_${Date.now()}`,
      sender: 'rakshak_ai',
      content: `I've noted that! I am continuously monitoring your vitals in the background. Is there anything specific you would like me to check or inform Rajesh ji about?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reasoningSteps: get().activeReasoningSteps,
      suggestedActions: [
        { label: 'Notify my son Rajesh', action: 'notify_family' },
        { label: 'Check my vitals again', action: 'check_vitals' },
      ],
    };

    set((state) => ({
      messages: [...state.messages, aiMsg],
      isThinking: false,
      activeReasoningSteps: [],
    }));
  },
}));
