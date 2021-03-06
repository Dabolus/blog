export interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string;
      siteUrl: string;
      description: string;
      topics: string[];
      menu: MenuItem[];
      footerMenu: MenuItem[];
      search: boolean;
      author: {
        name: string;
        description: string;
        social: SocialChannels;
      };
    };
  };
}

export interface Tag {
  name: string;
  color: string;
  icon: any;
  featured: boolean;
}

export interface Series {
  name: string;
  color: string;
  icon: any;
  featured: boolean;
  description: string;
}

export interface SocialChannels {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  telegram?: string;
}

export interface MenuItem {
  name: string;
  path: string;
}

export interface Post {
  id: string;
  timeToRead: number;
  frontmatter: {
    title: string;
    path: string;
    tags: string[];
    series?: string;
    excerpt: string;
    created: string;
    createdPretty: string;
    updated: string;
    updatedPretty: string;
    featuredImage?: any;
  };
  html: string;
  headings: Array<{ depth: number }>;
}

export interface Page {
  frontmatter: {
    title: string;
    path: string;
    excerpt: string;
  };
  html: string;
}
