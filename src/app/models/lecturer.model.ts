export interface LecturerInfo {
  name: string;
  title: string;
  department: string;
  university: string;
  tagline: string;
  biography: string;
  profileImage?: string;
}

export interface Education {
  degree: string;
  field: string;
  university: string;
  year: number;
}

export interface Achievement {
  title: string;
  year?: number;
  description?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  schedule: string;
  enrollment: number;
  format: string;
}

export interface Publication {
  link?: string;
  title: string;
  journal: string;
  year: number;
  citations: number;
  type: 'journal' | 'conference' | 'book';
}

export interface NewsItem {
  id: string;
  date: Date;
  title: string;
  excerpt: string;
  content?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  office: string;
  address: string;
  labWebsite?: string;
}

export interface OfficeHour {
  day: string;
  time: string;
  format: string;
  purpose: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon: string;
}
