export interface AvailabilityUser {
  id: number;
  name: string;
  avatar: string;
  time: string;
  description: string;
  duration: string;
}

export interface AvailabilityEvent {
  type: 'active' | 'unavailable' | 'complete';
  users: AvailabilityUser[];
}

export interface AvailabilityEvents {
  [day: number]: AvailabilityEvent;
}

export interface SessionDetail {
  id: number;
  clientName: string;
  avatar: string;
  time: string;
  duration: string;
  description: string;
  type: 'active' | 'unavailable' | 'complete';
}

export interface SessionDetailsData {
  date: Date;
  event: AvailabilityEvent;
  sessions: SessionDetail[];
}
