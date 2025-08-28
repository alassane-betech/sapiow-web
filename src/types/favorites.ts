// Types pour l'API Favorites
export interface Schedule {
  id: number;
  pro_id: string;
  day_of_week:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  start_time: string;
  end_time: string;
}

export interface Session {
  id: string;
  pro_id: string;
  price: number;
  session_type: "15m" | "30m" | "45m" | "60m";
  session_nature: "one_time" | "recurring";
  one_on_one: boolean;
  video_call: boolean;
  strategic_session: boolean;
  exclusive_ressources: boolean;
  support: boolean;
  mentorship: boolean;
  webinar: boolean;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProExpertise {
  id: number;
  pro_id: string;
  expertise_id: number;
}

export interface Domain {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Professional {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  language: string;
  email: string;
  phone: string;
  description: string;
  job: string;
  domain_id: number;
  schedules: Schedule[];
  sessions: Session[];
  pro_expertises: ProExpertise[];
  domains: Domain;
}

export interface AddFavoriteResponse {
  id: string;
  patient_id: string;
  pro_id: string;
  created_at: string;
  updated_at: string;
  pros: Professional;
}

export interface RemoveFavoriteResponse {
  success: boolean;
  message: string;
}

export interface GetFavoritesResponse {
  favorites: AddFavoriteResponse[];
}
