import type { FieldErrors, Job, RegisterPayload } from '../types/api';

const PHONE_REGEX = /^01[3-9]\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSPORT_REGEX = /^[A-Z][0-9]{8}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function validatePhone(phone?: string): string | null {
  const trimmed = phone?.trim() ?? '';
  if (!trimmed) return 'Phone number is required';
  if (!PHONE_REGEX.test(trimmed)) return 'Enter a valid Bangladesh phone (01XXXXXXXXX)';
  return null;
}

export function validatePassword(password?: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
}

export function validateEmail(email?: string): string | null {
  const trimmed = email?.trim() ?? '';
  if (!trimmed) return 'Email is required';
  if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address';
  return null;
}

export function validateLoginForm({
  phone,
  password,
}: {
  phone: string;
  password: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  const phoneError = validatePhone(phone);
  const passwordError = validatePassword(password);
  if (phoneError) errors.phone = phoneError;
  if (passwordError) errors.password = passwordError;
  return errors;
}

export function validateRegisterForm(form: RegisterPayload): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name?.trim()) errors.name = 'Full name is required';
  const phoneError = validatePhone(form.phone);
  if (phoneError) errors.phone = phoneError;
  const emailError = validateEmail(form.email);
  if (emailError) errors.email = emailError;
  const passwordError = validatePassword(form.password);
  if (passwordError) errors.password = passwordError;
  if (form.password !== form.confirm_password) {
    errors.confirm_password = 'Passwords do not match';
  }
  if (!form.passport_number?.trim()) {
    errors.passport_number = 'Passport number is required';
  } else if (!PASSPORT_REGEX.test(form.passport_number.trim().toUpperCase())) {
    errors.passport_number = 'Use format: A12345678 (letter + 8 digits)';
  }
  if (!form.dob?.trim()) {
    errors.dob = 'Please select your date of birth';
  } else if (!DATE_REGEX.test(form.dob.trim())) {
    errors.dob = 'Please select a valid date of birth';
  }
  if (!form.gender) errors.gender = 'Gender is required';
  return errors;
}

export function validateOtpForm({ phone, otp }: { phone: string; otp: string }): FieldErrors {
  const errors: FieldErrors = {};
  const phoneError = validatePhone(phone);
  if (phoneError) errors.phone = phoneError;
  if (!otp?.trim()) errors.otp = 'OTP is required';
  else if (!/^\d{4,6}$/.test(otp.trim())) errors.otp = 'Enter a valid OTP';
  return errors;
}

export function formatEmploymentType(type?: string): string {
  if (!type) return '';
  return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatSalary(job: Job): string {
  if (!job.min_salary && !job.max_salary) return 'Salary negotiable';
  const currency = job.currency || 'SAR';
  if (job.min_salary && job.max_salary) {
    return `${currency} ${job.min_salary} – ${job.max_salary}`;
  }
  return `${currency} ${job.min_salary || job.max_salary}`;
}
