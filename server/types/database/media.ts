export type SupaBaseMedia = {
  id: number;
  created_at: string;
  product_id: number;
  name: string;
  url: string;
  order: number;
  type: string;
};

export type SelectedMediaFile = {
  id?: number;
  name: string;
  type: string;
  order: number;
  isBusy: boolean;
  display_name: string;
  user_id: string;
  product_id: number;
  storage_id: string;
};
