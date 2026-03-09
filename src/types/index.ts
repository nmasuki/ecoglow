export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  accentColor: string;
  order: number;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  brandLine: string;
  subtitle: string;
  categoryId: string;
  category: ICategory;
  purpose: string;
  howToUse: string;
  features: string[];
  images: string[];
  size: string;
  isActive: boolean;
}

export interface IContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
