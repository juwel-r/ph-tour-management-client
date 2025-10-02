import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types/auth.types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const checkAuthorization = (Component: ComponentType, role?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery();

    if (!isLoading && !data?.data?.role) {
      return <Navigate to="/login"/>;
    }

    if(!isLoading && role !== data?.data?.role ){
     return <Navigate to="/unauthorize"/> 
    }
    return <Component />;
  };
};
