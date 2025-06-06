export interface SendMessageArgs {
  name: string;
  email: string;
  message: string;
}

export interface ChatArgs {
  message: string;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
}

export interface ChatResponse {
  message: string;
  confidence: number;
  intent: string;
  timestamp: string;
}

export interface ChatbotInfo {
  status: string;
  availableTopics: string[];
  website: string;
}