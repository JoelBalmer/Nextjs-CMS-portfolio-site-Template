import { GalleryPageDto } from "./dtos/gallery-page";
import { GraphQlCollection } from "./dtos/graphql-collection";
import { GraphQlEntry } from "./dtos/graphql-entries";
import { NavItem } from "./dtos/nav-item";
import { WebPage } from "./dtos/web-page";
import { getAllPagesQuery } from "./queries/get-all-pages";
import { getGalleryPageQuery } from "./queries/get-gallery-page";

const contentfulGraphQlUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
const contentfulToken = process.env.CONTENTFUL_DELIVERY_API_TOKEN;

const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${contentfulToken}`,
    'User-Agent': '*'
};

const cache: { [queryKey: string]: any; } = {};

export enum CacheKeys {
    ALL_PAGES = 'allPages',
    GALLERY_PAGE = 'galleryPage'
}

const makeRequest = async (incomingQuery: string) => {
    var options: RequestInit = {
        body: JSON.stringify({ query: incomingQuery }),
        headers: requestHeaders,
        method: 'POST'
    };
  
    return await fetch(contentfulGraphQlUrl, options)
        .then(response => response.json())
        .catch(error => console.log(`Error fetching contentful graphql data: ${error}`,));
};

// TODO: change to accept enum only
export const contentfulClient = async (incomingQuery: string, cacheKey: CacheKeys): Promise<any> => {
    const cachedResponse = cache[cacheKey];
    
    if (cachedResponse != null) {
        return cachedResponse;
    }
  
    const response = await makeRequest(incomingQuery);
    cache[cacheKey] = response;

    return response;
}

export const getPages = async (options: { includeCustomPages: boolean }): Promise<WebPage[]> => {
    const graphQlResponse: GraphQlCollection<WebPage> = await contentfulClient(getAllPagesQuery, CacheKeys.ALL_PAGES);
  
    const webPages: WebPage[] = graphQlResponse.data.webPageCollection.items;
    
    if (!options.includeCustomPages) {
        return sortPages(webPages);
    }

    const combinedPages = webPages.concat(await getCustomPages());
    
    return sortPages(combinedPages);
};

export const getEntry = async (entryId: string): Promise<WebPage> => {
    const graphQlResponse: GraphQlCollection<WebPage> = await contentfulClient(getAllPagesQuery, CacheKeys.ALL_PAGES);
    const webPages: WebPage[] = graphQlResponse.data.webPageCollection.items;
    
    return webPages.find(page => page.sys.id === entryId) || {} as WebPage;
}

const sortPages = (pages: WebPage[]): WebPage[] => {
    return pages.sort((page1, page2) => page1.sortOrder - page2.sortOrder);
}

const getCustomPages = async (): Promise<WebPage[]> => {
    const galleryResponse: GraphQlEntry<GalleryPageDto> = await contentfulClient(getGalleryPageQuery, CacheKeys.GALLERY_PAGE);
    const galleryPage: GalleryPageDto = galleryResponse.data.galleryPage;

    return [ galleryPage ];
};
