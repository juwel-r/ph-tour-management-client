import Booking from "@/pages/user/Booking";
import type { ISidebarItem } from "@/types";

export const userSidebarItems:ISidebarItem[] = [
      {
        title: "Booking Mana",
        items: [
          {
            title: "My Booking",
            url: "/user/booking",
            component: Booking,
          },
        ],
      },
]