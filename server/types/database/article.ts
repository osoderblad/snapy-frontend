export type Article = {
  id?: number; // Assuming article_id is auto-incremented, it should always be a number.
  title: string;
  meta_description: string; // These fields are optional and can be null.
  primary_keyword: string | null;
  secondary_keywords: string | null;
  content: string;
  slug: string;
  url: string;
  publication_date: string; // Date fields can be null if the article hasn't been published/updated.
  update_date: string;
  image_url: string; // Assuming this is a JSON string or a comma-separated list of URLs.
  author: string;
  article_status: "Draft" | "Published" | "Archived"; // Assuming these are the possible statuses.
};

export type ArticleSimple = {
  id?: number;
  title: string;
  meta_description: string; // These fields are optional and can be null.
  slug: string;
  publication_date: string; // Date fields can be null if the article hasn't been published/updated.
  image_url: string; // Assuming this is a JSON string or a comma-separated list of URLs.
};
