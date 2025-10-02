import type { TRole } from "@/types/auth.types";
import { role } from "@/constants/Role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";

export const getSidebarItemsByRole = (userRole: TRole) => {
  switch (userRole) {
    case role.SUPER_ADMIN:
      return [...adminSidebarItems, ...userSidebarItems];

    case role.ADMIN:
      return [...adminSidebarItems];

    case role.USER:
      return [...userSidebarItems];

    default:
      return [];
}
};
