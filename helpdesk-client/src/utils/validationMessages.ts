export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: (field: string) => `${field} is required.`,
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PASSWORD:
    "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
  MAX_LENGTH: (field: string, max: number) =>
    `${field} must not exceed ${max} characters.`,
  MIN_LENGTH: (field: string, min: number) =>
    `${field} must be at least ${min} characters long.`,
};
