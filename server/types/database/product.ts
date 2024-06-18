export type ProductView = {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: string | null;
  updated_at: string;
  stripe_id: string | null;
  slug: string;
};

export type Product = {
  name: string;
  description: string;
  price: number;
};

export type MediafileInfo = {
  id: number;
  name: string;
  url: string;
  order: number;
  type: string;
};
