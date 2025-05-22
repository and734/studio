
export interface Category {
  id: number;
  name: string;
  type: 'AI_TECHNOLOGY' | 'TASK_PURPOSE' | 'INDUSTRY';
  description?: string;
}

export interface Tool {
  id: number;
  name: string;
  website_url: string;
  brief_description: string;
  detailed_description?: string;
  pricing_model: 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'Free Trial';
  platform?: string;
  logo_url: string; 
  date_added: string; 
  last_updated: string; 
  is_published: boolean;
  categories: Category[];
}

export type ToolFormDataCore = {
  name: string;
  website_url: string;
  brief_description: string;
  detailed_description?: string;
  pricing_model: 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'Free Trial';
  platform?: string;
  logo_url: string;
  category_ids: number[];
};

export type NewToolFormData = ToolFormDataCore;

export type EditToolFormData = ToolFormDataCore & { id: number };

// For AI category suggestion
export interface AISuggestionRequest {
  toolName: string;
  toolDescription: string;
}

export interface AISuggestionResponse {
  suggestedCategories: string[];
}
