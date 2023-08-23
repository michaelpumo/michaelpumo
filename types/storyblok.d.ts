import {StoryblokStory} from 'storyblok-generate-ts'

export interface ClientStoryblok {
  title?: string;
  _uid: string;
  component: "client";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface ClientsStoryblok {
  title?: string;
  text?: RichtextStoryblok;
  clients?: ClientStoryblok[];
  style?: StyleStoryblok[];
  _uid: string;
  component: "clients";
  [k: string]: any;
}

export interface ContactStoryblok {
  title?: string;
  text?: RichtextStoryblok;
  style?: StyleStoryblok[];
  _uid: string;
  component: "contact";
  [k: string]: any;
}

export interface HeroStoryblok {
  title?: string;
  description?: RichtextStoryblok;
  footer?: RichtextStoryblok;
  style?: StyleStoryblok[];
  _uid: string;
  component: "hero";
  [k: string]: any;
}

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (HeroStoryblok | StatementStoryblok | ProjectsStoryblok | ContactStoryblok | ClientsStoryblok)[];
  meta_title?: string;
  meta_description?: string;
  meta_image?: AssetStoryblok;
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface ProjectStoryblok {
  title?: string;
  image?: AssetStoryblok;
  _uid: string;
  component: "project";
  [k: string]: any;
}

export interface ProjectsStoryblok {
  projects?: ProjectStoryblok[];
  style?: StyleStoryblok[];
  _uid: string;
  component: "projects";
  [k: string]: any;
}

export interface StatementStoryblok {
  title?: string;
  style?: StyleStoryblok[];
  _uid: string;
  component: "statement";
  [k: string]: any;
}

export interface StyleStoryblok {
  background?: number | string;
  colour?: number | string;
  _uid: string;
  component: "style";
  [k: string]: any;
}
