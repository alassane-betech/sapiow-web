export interface Conversation {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  active?: boolean;
}

export interface Message {
  id: number;
  sender?: string;
  message: string;
  time: string;
  isOwn: boolean;
  avatar?: string;
  hasImage?: boolean;
}
