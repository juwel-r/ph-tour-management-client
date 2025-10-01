import AddTour from "@/pages/admin/AddTour";
import Analytics from "@/pages/admin/Analytics";
import type { ISidebarItem } from "@/types";
import AllUser from "@/pages/admin/AllUser";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All User",
        url: "/admin/all-user",
        component: AllUser,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
      {
        title: "Project Structure",
        url: "#",
        component: AddTour,
      },
    ],
  },
];
