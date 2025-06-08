export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  registrationStatus?: 'not-registered' | 'pending' | 'confirmed' | 'failed';
  metadata?: {
    title: string;
    registrationDate: Date;
    onChainId: string;
  };
  remixedFrom?: string;
}

export interface RegisteredIP {
  id: string;
  title: string;
  type: 'story' | 'poem' | 'image' | 'code';
  content: string;
  registrationDate: Date;
  status: 'pending' | 'confirmed' | 'failed';
  tags: string[];
  license: string;
  onChainId: string;
  remixedFrom?: string;
}