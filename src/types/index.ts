import type { ComponentType } from "react";

export type {
  IRegister,
  ILogin,
  ILoginResponse,
  ISendOtp,
  IVerifyOtp,
  IUser,
} from "./auth.types";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
