import { GetStaticProps, InferGetStaticPropsType } from "next";
import PageLayout from "../src/components/PageLayout/PageLayout";
import React from "react";
import Gallery from "../src/components/Gallery/Gallery";
import { NavItem } from "../src/api/contentful/dtos/nav-item";
import { GalleryPageDto } from "../src/api/contentful/dtos/gallery-page";
import { CacheKeys, contentfulClient, getPages } from '../src/api/contentful/contentful-helper';
import { getGalleryPageQuery } from "../src/api/contentful/queries/get-gallery-page";
import { GraphQlEntry } from "../src/api/contentful/dtos/graphql-entries";

interface Props {
  galleryPage: GalleryPageDto;
  navItems: NavItem[];
}

export default function GalleryPage({ galleryPage, navItems }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout page={galleryPage} navItems={navItems}>
      <Gallery images={galleryPage.imagesCollection.items} />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const navItems = await getPages({ includeCustomPages: true });  

  const graphQlResponse: GraphQlEntry<GalleryPageDto> = await contentfulClient(getGalleryPageQuery, CacheKeys.GALLERY_PAGE);

  const galleryPage: GalleryPageDto = graphQlResponse.data.galleryPage;

  return { props: { galleryPage, navItems } };
}
