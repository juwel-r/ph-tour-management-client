import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types/auth.types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

export const checkAuthorization = (Component: ComponentType, role?: TRole) => {
  return function AuthWrapper() {
    const location = useLocation();

    const { data, isLoading } = useUserInfoQuery();

    if (!isLoading && !data?.data?.role) {
      return <Navigate to="/login" state={location.pathname} />;
    }

    if (!isLoading && role && role !== data?.data?.role) {
      return <Navigate to="/unauthorize" />;
    }
    return <Component />;
  };
};
