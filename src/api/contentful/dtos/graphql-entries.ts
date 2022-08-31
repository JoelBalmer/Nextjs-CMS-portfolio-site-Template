type EntryTypes = 'webPage' | 'galleryPage';

export interface GraphQlEntry<T> {
  data: {
    [entryName in EntryTypes]: T
  }
}