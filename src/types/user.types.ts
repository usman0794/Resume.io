export interface User {
  id: number;
  name: string;
  email: string;
  role?: 'admin' | 'user';
  avatar?: string;
  created_at?: string;
}

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  status: string | null;
}
