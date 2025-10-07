import type { ComponentType } from "react";

export type {IRegister,ILogin,ILoginResponse,ISendOtp,IVerifyOtp,IUser,} from "./auth.types";
export type { IDivision, IDivisionFormData } from "./division.types";
export type { ITourType } from "./tourType.types";
export type { ITour } from "./tour.types";


export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}


export interface Meta {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
  loaded: number;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
