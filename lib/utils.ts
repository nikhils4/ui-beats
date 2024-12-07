import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import DOMPurify from "dompurify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeHtml = (html: string) => {
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(html);
  } else {
    const { JSDOM } = require("jsdom");
    const jsdomWindow = new JSDOM("").window;
    const windowLike = {
      ...jsdomWindow,
      DocumentFragment: jsdomWindow.DocumentFragment,
      HTMLTemplateElement: jsdomWindow.HTMLTemplateElement,
      Node: jsdomWindow.Node,
      Element: jsdomWindow.Element,
      NodeFilter: jsdomWindow.NodeFilter,
      NamedNodeMap: jsdomWindow.NamedNodeMap,
      HTMLFormElement: jsdomWindow.HTMLFormElement,
      DOMParser: jsdomWindow.DOMParser,
    };
    const domPurify = DOMPurify(windowLike);
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

export const fetchFileContent = async (file: string) => {
  try {
    const response = await fetch(`/api/file-content?file=${file}`);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching file content:", error);
  }
};