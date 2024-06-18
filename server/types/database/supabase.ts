export type TestimonialRead = {
  id: string;
  created_at: string;
  video_url: string;
  system_id: string;
  aspect_ratio: number;
  title: string;
  username: string;
  type: "embed/vimeo" | "embed/youtube";
  description: string;
  videoLoaded: boolean;
};

export type Testimonial = {
  video_url: string;
  system_id?: string | null;
  title: string;
  aspect_ratio: number;
  username: string;
  type: "embed/vimeo" | "embed/youtube";
  description: string | null;
};

// image: string;
