import type { Import } from "@prisma/client";

export const category = [
  {
    label: "Dinner",
    value: 1,
  },
  {
    label: "Fuel ⛽️",
    value: 2,
  },
  {
    label: "Present 🎁",
    value: 3,
  },
  {
    label: "Plane 🚀",
    value: 4,
  },

  {
    label: "Hotel 🏨",
    value: 5,
  },
  {
    label: "Lunch 🍱",
    value: 6,
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
