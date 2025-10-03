import AddDivision from "@/pages/admin/division/AddDivision";
import { AddTour } from "@/pages/admin/tour/AddTour";

import AddTourType from "@/pages/admin/tourType/AddTourType";
// import Analytics from "@/pages/admin/Analytics";
import type { ISidebarItem } from "@/types";
// import AllUser from "@/pages/admin/AllUser";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));

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
    title: "Tour Management",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
    ],
  },
];
