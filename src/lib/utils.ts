import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUniqueId = () => {
  return "id-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);
};
