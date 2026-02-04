export interface Template {
  id: number;
  name: string;
  default_layout?: string;
  tags?: string[];
  is_active?: boolean;
  image?: string;
  image_url?: string;
  image_path?: string;
  html?: string;
  created_at?: string;
}

export interface TemplateState {
  templates: Template[];
  loading: boolean;
  error: string | null;
}
