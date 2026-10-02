// Safe to import from client components (no server-only code here).

export interface BlogSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image_url: string | null;
  read_time: string;
  is_published: boolean;
  is_featured: boolean;
  published_at: string;
  created_at: string;
}

export interface BlogItem extends BlogSummary {
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  updated_at: string;
}

export const BLOG_CATEGORIES = [
  "IEPF Recovery",
  "Physical to Demat",
  "Transmission of Shares",
  "Unclaimed Dividends",
  "NRI Asset Recovery",
  "PF Recovery",
  "Legal & Regulations",
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): HeadingItem[] {
  if (!markdown) return [];
  const headings: HeadingItem[] = [];
  const lines = markdown.split("\n");

  lines.forEach((line) => {
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      const text = h2Match[1].trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      headings.push({ id, text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      headings.push({ id, text, level: 3 });
    }
  });

  return headings;
}
