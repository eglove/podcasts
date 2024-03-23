export type YouTubeFeed = {
  id: string;
  items: Item[];
  link: string;
  title: string;
  type: string;
};

type Item = {
  id: string;
  link: string;
  media: Medum[];
  pubDate: string;
  title: string;
};

type Medum = {
  height: number;
  isDefault: boolean;
  type: string;
  url: string;
  width: number;
};
