export interface OnboardingExpertData {
  first_name: string;
  last_name: string;
  domain_id: number;
  description?: string;
  linkedin?: string;
  website?: string;
  job?: string;
  expertises?: Array<{
    expertise_id: number;
  }>;
  avatar?: File | string;
}

export interface OnboardingSeekerData {
  first_name: string;
  last_name: string;
  // Add other seeker-specific fields as needed
}

export interface OnboardingExpertError {
  message: string;
  status?: number;
}

export interface OnboardingSeekerError {
  message: string;
  status?: number;
}

export interface OnboardingExpertResponse {
  id: number;
  first_name: string;
  last_name: string;
  domain_id: number;
  description?: string;
  linkedin?: string;
  website?: string;
  job?: string;
  avatar?: string;
  // Add other response fields as needed
}

export interface OnboardingSeekerResponse {
  id: number;
  first_name: string;
  last_name: string;
  // Add other response fields as needed
}

// Validation functions
export const isOnboardingExpertDataValid = (data: OnboardingExpertData): boolean => {
  return !!(
    data.first_name?.trim() &&
    data.last_name?.trim() &&
    data.domain_id &&
    typeof data.domain_id === 'number'
  );
};

export const isOnboardingSeekerDataValid = (data: OnboardingSeekerData): boolean => {
  return !!(
    data.first_name?.trim() &&
    data.last_name?.trim()
  );
};

// Transform functions for FormData
export const transformOnboardingExpertToFormData = (data: OnboardingExpertData): FormData => {
  const formData = new FormData();
  
  formData.append('first_name', data.first_name.trim());
  formData.append('last_name', data.last_name.trim());
  formData.append('domain_id', data.domain_id.toString());
  
  if (data.description) formData.append('description', data.description.trim());
  if (data.linkedin) formData.append('linkedin', data.linkedin.trim());
  if (data.website) formData.append('website', data.website.trim());
  if (data.job) formData.append('job', data.job.trim());
  if (data.avatar instanceof File) formData.append('avatar', data.avatar);
  if (data.expertises) formData.append('expertises', JSON.stringify(data.expertises));
  
  return formData;
};

export const transformOnboardingSeekerToFormData = (data: OnboardingSeekerData): FormData => {
  const formData = new FormData();
  
  formData.append('first_name', data.first_name.trim());
  formData.append('last_name', data.last_name.trim());
  
  return formData;
};

// Domain mapping function - maps string domain to numeric ID
export const mapDomainIdToNumeric = (domain: string): number | null => {
  const domainMap: { [key: string]: number } = {
    // Add your domain mappings here based on your API
    // Example:
    // 'technology': 1,
    // 'business': 2,
    // 'design': 3,
    // 'marketing': 4,
  };
  
  return domainMap[domain] || null;
};