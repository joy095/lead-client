// API client for handling all HTTP requests
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Get token from localStorage (or sessionStorage)
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Remove token and redirect to login
const handleUnauthorized = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
};

// Default headers
const getDefaultHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Define the exact response structure based on your backend
export interface ApiResponse<T> {
  success: boolean;
  // For lead list responses, the backend returns { leads: Lead[], pagination: ... }
  // For single lead responses, the backend returns {  Lead }
  leads?: T extends any[] ? T : never;
  data?: T extends object & { _id: string } ? T : never;
  pagination?: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
  token: string;
  message?: string;
}

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

export interface AnalyticsData {
  totalLeads: number;
  convertedLeads: number;
  lostLeads: number;
  avgDealValue: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export const apiClient = {
  get: async <T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> => {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: getDefaultHeaders(),
    });

    const data = await response.json();

    // Handle unauthorized responses
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error("Unauthorized - Please log in again");
    }

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }
    return data;
  },

  post: async <T>(endpoint: string, body: any): Promise<ApiResponse<T>> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getDefaultHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Handle unauthorized responses
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error("Unauthorized - Please log in again");
    }

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }
    return data;
  },

  put: async <T>(endpoint: string, body: any): Promise<ApiResponse<T>> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getDefaultHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Handle unauthorized responses
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error("Unauthorized - Please log in again");
    }

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }
    return data;
  },

  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: getDefaultHeaders(),
    });

    const data = await response.json();

    // Handle unauthorized responses
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error("Unauthorized - Please log in again");
    }

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }
    return data;
  },

  // Special method for authentication endpoints (no token needed)
  authPost: async <T>(endpoint: string, body: any): Promise<ApiResponse<T>> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }
    return data;
  },
};
