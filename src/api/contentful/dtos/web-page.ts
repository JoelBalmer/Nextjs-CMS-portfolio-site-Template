import { GraphQlImage } from "./graphql-image";
import { Document } from '@contentful/rich-text-types';

export interface WebPage {
  sys: {
    id: string;
  };
  title: string;
  mainBodyText: Document;
  urlPath: string;
  image?: GraphQlImage;
  sortOrder: number;
}
