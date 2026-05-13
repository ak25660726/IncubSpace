import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Filters sensitive information like emails and phone numbers to prevent circumvention.
 * Specific to Tunisian context for phone numbers.
 */
export function filterSensitiveContent(text: string): { content: string, hasFiltered: boolean } {
  // Regex for emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  
  // Regex for Tunisian phone numbers: 8 digits, often starts with 2, 4, 5, 7, 9
  // Also matches with country code +216 or 00216
  const phoneRegex = /(\+216|00216)?[-\s]?[24579]\d{7}|[24579]\d{7}/g;
  
  let hasFiltered = false;
  let filteredContent = text;

  if (emailRegex.test(text)) {
    filteredContent = filteredContent.replace(emailRegex, "[EMAIL MASQUÉ]");
    hasFiltered = true;
  }

  if (phoneRegex.test(text)) {
    filteredContent = filteredContent.replace(phoneRegex, "[NUMÉRO MASQUÉ]");
    hasFiltered = true;
  }

  return { content: filteredContent, hasFiltered };
}
