import { IMAGE_FOLDERS, STORAGE_BASE_URL, type ImageFolder } from '../constants/config';
import type { Job } from '../types/api';

export function buildImageUrl(folder: ImageFolder, image?: string | null): string | null {
  if (!image) return null;
  return `${STORAGE_BASE_URL}/${folder}/${image}`;
}

export function getIndustryImageUrl(image?: string | null): string | null {
  return buildImageUrl(IMAGE_FOLDERS.industry, image);
}

export function getCompanyImageUrl(image?: string | null): string | null {
  return buildImageUrl(IMAGE_FOLDERS.company, image);
}

export function getJobImageUrl(job: Job): string | null {
  const image = job.company?.image ?? job.image;
  return getCompanyImageUrl(image);
}
