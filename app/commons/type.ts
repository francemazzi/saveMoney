import type { Import, User } from "@prisma/client";

export const category = [
  {
    label: "Dinner",
    value: "Dinner",
  },
  {
    label: "Fuel ⛽️",
    value: "Fuel ⛽️",
  },
  {
    label: "Present 🎁",
    value: "Present 🎁",
  },
  {
    label: "Plane 🚀",
    value: "Plane 🚀",
  },

  {
    label: "Hotel 🏨",
    value: "Hotel 🏨",
  },
  {
    label: "Lunch 🍱",
    value: "Lunch 🍱",
  },
];

//import creation

export interface CreateImportInterface {
  name: Import["name"];
  value: Import["value"];
  category: Import["category"];
  entry: Import["entry"];
  fixed?: Import["fixed"];
  start_date?: Import["start_date"];
  update_date?: Import["update_date"];
  due_date?: Import["due_date"];
  description?: Import["description"];
}

export interface UserImportInterface {
  userId: User["id"];
  importId: Import["id"];
}

export interface UpdateUserIntr {
  id: User["id"];
  field: string;
  value: any;
}
