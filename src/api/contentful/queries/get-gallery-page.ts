export const getGalleryPageQuery = `
    query getGalleryPage {
        galleryPage(id:"2mnkHmNCimqiUt8htXYk7R") {
            urlPath
            title
            mainBodyText {
                json
            }
            sortOrder
            imagesCollection {
                items {
                    sys {
                        id
                    }
                    description
                    height
                    width
                    url
                    title
                }
            }
        }
    }`;
