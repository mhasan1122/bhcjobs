const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseISODate(value?: string): Date | null {
  if (!value || !DATE_REGEX.test(value.trim())) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function formatDateForDisplay(iso: string): string {
  const date = parseISODate(iso);
  if (!date) return iso;
  try {
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function getDefaultBirthDate(): Date {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 25);
  return date;
}

export const MIN_BIRTH_DATE = new Date(1950, 0, 1);
export const MAX_BIRTH_DATE = new Date();
