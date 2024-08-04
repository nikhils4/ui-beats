type Breadcrumb = {
  label: string;
  href?: string;
};

type InstallationStep = {
  description: string;
  code?: string;
  isFullCode?: boolean;
};

type Prop = {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
};

export type ComponentConfigType = {
  breadcrumbs: Breadcrumb[];
  title: string;
  description: string;
  usageCode: string;
  installation: InstallationStep[];
  props: Prop[];
  credits?: string;
};
