export const getAllPagesQuery = `
    query GetAllPages {
        webPageCollection {
            items {
                sys {
                    id
                }
                urlPath
                title
                image {
                    sys {
                        id
                    }
                    description
                    height
                    width
                    url
                    title
                }
                mainBodyText {
                    json
                }
                sortOrder
            }
        }
    }`;
