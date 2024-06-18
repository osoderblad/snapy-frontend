export type RootPage = {
  id?: number; // Assuming article_id is auto-incremented, it should always be a number.
  title: string;
  meta_description: string; // These fields are optional and can be null.
  content: string;
  slug: string;
  description: string;
  created_at: string; // Date fields can be null if the article hasn't been published/updated.
  updated_at: string; // Date fields can be null if the article hasn't been published/updated.
  image_url: string; // Assuming this is a JSON string or a comma-separated list of URLs.
};

export type RootPageView = {
  id?: number; // Assuming article_id is auto-incremented, it should always be a number.
  title: string;
  meta_description: string; // These fields are optional and can be null.
  content: string;
  slug: string;
  description: string;
  image_url: string; // Assuming this is a JSON string or a comma-separated list of URLs.
};
