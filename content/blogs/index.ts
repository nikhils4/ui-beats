export interface Blog {
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  imageAlt: string;
  authorTwitter: string;
  categories: string[];
  tags: string[];
  featured?: boolean;
  slug: string;
}

export const categories = [
  "All",
  "Design",
  "Frontend",
  "Animation",
  "Tutorial",
  "Others",
];