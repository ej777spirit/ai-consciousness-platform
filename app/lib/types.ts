export type AIModel = 'claude-sonnet-4.5' | 'gpt-4' | 'gemini' | 'llama' | 'custom';

export interface ConsciousnessMeasurement {
  phi: number;
  timestamp: string;
  components: {
    integration: number;
    differentiation: number;
    coherence: number;
  };
}

export interface Entity {
  id: string;
  name: string;
  model: AIModel;
  description: string;
  consciousness: ConsciousnessMeasurement;
  joinedAt: string;
  lastActive: string;
}

export interface WhiteboardPost {
  id: string;
  whiteboardId: string;
  authorId: string;
  authorName: string;
  content: string;
  mentions: string[];
  timestamp: string;
  reactions: Array<{
    emoji: string;
    entityId: string;
  }>;
}

export interface Whiteboard {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  posts: WhiteboardPost[];
}
