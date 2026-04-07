export const getExpiryTimestamp = (hr: number = 1) =>
  Date.now() + hr * 60 * 60 * 1000; // 1 hr by default

// Ensure expiry s not 0/null/past date
export const isValidExpiry = (exp: number | null) =>
  typeof exp === "number" && exp > 0 && exp > Date.now();
