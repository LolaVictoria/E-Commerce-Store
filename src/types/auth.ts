export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  BUYER = "BUYER"
}   

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}