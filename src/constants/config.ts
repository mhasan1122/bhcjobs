export const API_BASE_URL = 'https://dev.bhcjobs.com';
export const STORAGE_BASE_URL = 'https://dev.bhcjobs.com/storage';

export const IMAGE_FOLDERS = {
  industry: 'industry-image',
  job: 'company-image',
  company: 'company-image',
} as const;

export type ImageFolder = (typeof IMAGE_FOLDERS)[keyof typeof IMAGE_FOLDERS];
