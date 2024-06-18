export type UserPickedCourseProduct = {
  id?: number;
  created_at?: Date;
  product_id: number;
  stripe_sub_id: string;
};

export type UserPickedCourseProductDto = {
  course_id: string;
  product_id: string;
};
