import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return "Unknown Date";

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [year, month, day] = dateStr.split("T")[0].split("-");

  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
};


