export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validateEmail = (value: string): string | null =>
  EMAIL_REGEX.test(value) ? null : "সঠিক ইমেইল ঠিকানা দিন";

export const validateName = (value: string): string | null =>
  value.trim().length < 2 ? "নাম কমপক্ষে ২ অক্ষরের হতে হবে" : null;

export const validatePassword = (value: string): string | null => {
  if (value.length < 8) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
  if (!/[A-Z]/.test(value))
    return "কমপক্ষে একটি বড় হাতের ইংরেজি অক্ষর (A-Z) দিন";
  if (!/[0-9]/.test(value)) return "কমপক্ষে একটি সংখ্যা (0-9) দিন";
  return null;
};
