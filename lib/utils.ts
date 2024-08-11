import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeHtml = (html: string) => {
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(html);
  } else {
    const { JSDOM } = require("jsdom");
    const window = new JSDOM("").window as unknown as Window;
    const domPurify = DOMPurify(window);
    return domPurify.sanitize(html);
  }
};

export const getGithubStarsCount = async (
  repoName: string,
): Promise<number> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoName}`);
    if (response.ok) {
      const data = await response.json();
      return data.stargazers_count;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error fetching GitHub stars count:", JSON.stringify(error));
    return 0;
  }
};
