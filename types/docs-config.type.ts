import { ComponentConfigType } from "@/types/component-config.type";

export type DocsConfigType = {
  [section: string]: {
    [category: string]: ComponentConfigType;
  };
};
