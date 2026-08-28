export interface Profile {
  id: number;

  firstname: string;
  lastname: string;

  email: string;
  phone: string;

  avatar: string;

  bio: string;

  role: string;

  country: string;
  city: string;
  postalCode: string;

  facebook: string;
  twitter: string;
  linkedin: string;
  github: string;
  instagram: string;

  createdAt: string;

  isVerified: boolean;
}
