export interface AgendaItem {
  id: string;
  number: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
  active: boolean;
  presenter?: string;
  notes?: string;
}

export interface Participant {
  id: string;
  name: string;
  role: 'Host' | 'Presenter' | 'Attendee';
  avatar?: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isSharingScreen?: boolean;
  isHandRaised?: boolean;
  initials: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  role?: string;
  text: string;
  timestamp: string;
}

export type WhiteboardTool = 'pen' | 'eraser' | 'rectangle' | 'circle' | 'arrow' | 'text' | 'sticky';

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPriceRupees: number;
  annualPriceRupees: number; // per month when billed annually
  popular?: boolean;
  description: string;
  features: string[];
  omittedFeatures?: string[];
  ctaText: string;
}

export interface PricingCustomization {
  seats: number;
  planId: 'starter' | 'pro' | 'business' | 'sovereign';
  billingCycle: 'monthly' | 'annual';
  recordingVault: boolean;
  aiTranscription: boolean;
  roomConnectorsCount: number;
  sovereignCloud: boolean;
  prioritySupport: boolean;
}
