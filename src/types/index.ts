export type Treatment = {
  id: string; category: 'facial' | 'corporal'; name: string; slug: string;
  short_description: string; benefits: string[]; price?: number | null; duration?: string | null;
  description?: string | null; image_url?: string | null; active?: boolean; sort_order?: number;
};
export type Testimonial = { id: string; client_name: string; testimonial: string; rating: number | null; image_url: string | null };
