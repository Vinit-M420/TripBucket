export type ContentTypeState = 'all' | 'video' | 'link' | 'note' | 'image';

export type ContentItem = {
  _id: number;
  type: ContentTypeState;
  title: string;
  value?: string;
};