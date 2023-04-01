export type Highlight = {
  text: string;
  html: string;
  entity_type: string;
};

export type HighlightWithUrl = Highlight & {
  url: string;
};
