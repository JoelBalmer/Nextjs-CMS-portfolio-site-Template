type Collections = 'webPageCollection' | 'galleryPageCollection';

export interface GraphQlCollection<T> {
  data: {
    [collectionName in Collections]: {
      items: T[];
    }
  }
}