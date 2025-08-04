export interface TikTokVideoResult {
  status: boolean;
  audio: string;
  video: string;
  author: string;
  desc: string;
}

export interface TikTokSlideResult {
  status: boolean;
  image: string[];
  audio: string;
  author: string;
  desc: string;
}

export interface FacebookLink {
  quality: string;
  href: string;
}

export interface FacebookResult {
  status: boolean;
  links: FacebookLink[];
}