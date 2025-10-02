import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};

//flatMap return a plain and single array, when we map inside another map then it return array or array like -> [obj1],[obj2],[obj2] but when use flatMap then return -> [obj1, obj2, obj3]