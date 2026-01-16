// Type definitions for the Lead Management Dashboard

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  stage: "new" | "contacted" | "qualified" | "converted" | "lost";
  source: string;
  value?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Pagination {
  page: number;
  totalPages: number;
  totalItems: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  leads?: T[];
  pagination?: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
  message?: string;
}


export interface AnalyticsData {
  totalLeads: number;
  convertedLeads: number;
  lostLeads: number;
  avgDealValue: number;
}

// Authentication response
export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

// Lead form data
export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  stage: "new" | "contacted" | "qualified" | "converted" | "lost";
  source?: string;
  value?: number;
  notes?: string;
}

// Query parameters for API requests
export interface LeadQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  stage?: string;
  source?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
