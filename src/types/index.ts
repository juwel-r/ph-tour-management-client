import type { ComponentType } from "react";

export type {
  IRegister,
  ILogin,
  ILoginResponse,
  ISendOtp,
  IVerifyOtp,
  IResponse,
  IUser,
} from "./auth.types";

export interface ISidebarItem{
  title:string;
  items:{
    title:string;
    url:string
    component:ComponentType
  }[]
}