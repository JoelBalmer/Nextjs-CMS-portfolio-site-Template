import { GraphQlImage } from "./graphql-image";
import { WebPage } from "./web-page";

// TODO: naming clash means should probably rename everything to *-dto.ts
export interface GalleryPageDto extends WebPage {
    imagesCollection: {
        items: GraphQlImage[];
    };
}