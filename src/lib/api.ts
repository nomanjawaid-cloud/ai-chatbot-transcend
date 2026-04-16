// API configuration and helper functions

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
export const LOGIN_ENDPOINT = process.env.NEXT_PUBLIC_LOGIN_ENDPOINT || '/auth/login';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

/**
 * Login user and receive JWT tokens
 * POST /auth/loginUser (or custom endpoint)
 */
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  const url = `${API_BASE_URL}${LOGIN_ENDPOINT}`;
  
  console.log('Attempting login to:', url);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  console.log('Response status:', response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    console.error('Login error:', errorData);
    
    if (response.status === 404) {
      throw new Error('Login endpoint not found. Please check your API configuration.');
    }
    
    if (response.status === 401) {
      throw new Error(errorData.message || 'Invalid credentials');
    }
    
    if (response.status === 403) {
      throw new Error(errorData.message || 'Please verify your email before logging in');
    }
    
    throw new Error(errorData.message || 'Login failed. Please try again.');
  }

  const data: LoginResponse = await response.json();
  return data;
}

/**
 * Store authentication tokens in localStorage
 */
export function storeTokens(accessToken: string, refreshToken: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
}

/**
 * Get access token from localStorage
 */
export function getAccessToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
}

/**
 * Get refresh token from localStorage
 */
export function getRefreshToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refreshToken');
  }
  return null;
}

/**
 * Clear authentication tokens from localStorage
 */
export function clearTokens(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
}

/**
 * Store user data in localStorage
 */
export function storeUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

/**
 * Get user data from localStorage
 */
export function getStoredUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

/**
 * Query blueprints using natural language
 * POST /mcp/query
 */
export interface BlueprintQueryRequest {
  prompt?: string;
}

export interface BlueprintQueryResponse {
  success: boolean;
  response?: string;
  error?: string;
  timestamp: string;
}

export async function queryBlueprints(request: BlueprintQueryRequest = {}): Promise<BlueprintQueryResponse> {
  const token = getAccessToken();
  
  if (!token) {
    throw new Error('Authentication required. Please sign in.');
  }

  const url = `${API_BASE_URL}/mcp/query`;
  
  console.log('Querying blueprints:', request.prompt || 'show my blueprints');
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      prompt: request.prompt || 'show my blueprints'
    }),
  });

  console.log('Blueprint query response status:', response.status);

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      clearTokens();
      throw new Error('Session expired. Please sign in again.');
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to query blueprints. Please try again.');
  }

  const data: BlueprintQueryResponse = await response.json();
  return data;
}
