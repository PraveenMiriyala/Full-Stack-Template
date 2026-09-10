export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  image?: string | null;
}
