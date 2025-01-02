export interface Link {
  id: string;
  user_id: string;
  original_url: string;
  short_id: string;
  password?: string;
  secret_word?: string;
  whitelist?: string[];
  access_count: number;
  max_access?: number;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AccessLog {
  id: string;
  link_id: string;
  accessed_by: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface AccessRequest {
  id: string;
  link_id: string;
  requester_name: string;
  requester_email: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}