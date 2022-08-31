This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# Next JS Contentful/CMS portfolio site template
## Getting started
After cloning the repository and installing the node packages, in order to get the project building you will need to:

1. Copy the `.env.template` file, rename to `.env.local` and populate with the correct values from contentful
1. In contentful, create a content model called `webPage` to inclue the following fields:
    1. title: string;
    1. mainBodyText: Contentful rich text field;
    1. urlPath: string;
    1. image: Contentful image asset;
    1. sortOrder: number;
1. Create an identical content model but called `galleryPage`
    1. In addition this needs an `images` field (multiple contentful image assets)
1. Create some entries from the above content type (as well as a gallery) and publish
1. Once created, swap the entry id of the galleryPage entry with your if in the `get-gallery-page.ts` file
1. Add your name to `NEXT_PUBLIC_WEBSITE_OWNER_NAME=`
1. Replace `public/favicons/favicon-192.png` with your own favicon

In theory, that should now build and work 🤞