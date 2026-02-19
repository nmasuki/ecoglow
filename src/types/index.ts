export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  accentColor: string;
  order: number;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  brandLine: string;
  subtitle: string;
  category: ICategory;
  purpose: string;
  howToUse: string;
  features: string[];
  images: string[];
  size: string;
  isActive: boolean;
}

export interface IContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
