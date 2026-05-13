export type UserRole = 'client' | 'prestataire' | 'admin';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  region: string | null;
  skills: string[];
  badges: string[];
  rating: number;
  portfolio: any[];
  premium_status: boolean;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  client_id: string;
  category: string;
  region: string;
  description: string;
  photos: string[];
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'closed';
  created_at: string;
}

export interface Offer {
  id: string;
  request_id: string;
  prestataire_id: string;
  price: number;
  delay: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface Message {
  id: string;
  offer_id: string;
  sender_id: string;
  content: string;
  is_filtered: boolean;
  created_at: string;
}
