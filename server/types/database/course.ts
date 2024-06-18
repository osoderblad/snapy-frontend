import type { ProductView } from "./product";

export type Course = {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  price: string;
  stripe_id: string;
  pick_and_choose: boolean;
  pick_and_choose_objects?: number;
  pick_and_choose_alternative_name?: string;
  products?: ProductView[] | null;
};

export type CourseOrBundle = ({} & Course) | null;

export type MediaObject = {
  id: number;
  course_id: number;
  name: string;
  slug: string;
  description: string;
  type: "bundle" | "course";
  created: string;
  subscription: SubscriptionDetails;
  products: ProductView[];
};

export type Course_Product = {
  id: number;
  created_at: string;
  course_id: number;
  product_id: number;
  order: number;
};
