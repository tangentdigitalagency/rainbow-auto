export function formatPhoneNumber(phone: string | null | undefined): string {
  // Return empty string if phone is null/undefined
  if (!phone) return "";

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");

  // Handle +1 format (11 digits)
  if (cleaned.length === 11 && cleaned.startsWith("1")) {
    const areaCode = cleaned.slice(1, 4);
    const prefix = cleaned.slice(4, 7);
    const lineNumber = cleaned.slice(7);
    return `+1 (${areaCode}) ${prefix}-${lineNumber}`;
  }

  // Handle regular 10-digit format
  if (cleaned.length === 10) {
    const areaCode = cleaned.slice(0, 3);
    const prefix = cleaned.slice(3, 6);
    const lineNumber = cleaned.slice(6);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  }

  // Return original if can't format
  return phone;
}

export function formatToE164(phone: string): string {
  // For API: format as +15555550123
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.startsWith("1") && cleaned.length === 11) {
    return `+${cleaned}`;
  }
  throw new Error("Invalid phone number format");
}
