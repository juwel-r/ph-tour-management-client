export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "GUID";

export interface AuthProvider {
  provider: "google" | "credential";
  providerId: string;
}

export type TIsActive = "ACTIVE" | "INACTIVE" | "BLOCK";

export interface Auth {
  provider: string;
  providerId: string;
}

export interface IUser {
  name: string;
  email: string;
  address?: string;
  phone?: string;
  picture?: string;
  isActive: TIsActive;
  isVerified: boolean;
  isDelete: boolean;
  role: TRole;
  auth: Auth[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
