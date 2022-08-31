import { GetStaticProps, InferGetStaticPropsType } from "next";
import { NavItem } from "../src/api/contentful/dtos/nav-item";
import { WebPage } from "../src/api/contentful/dtos/web-page";
import PageLayout from '../src/components/PageLayout/PageLayout';
import { getEntry, getPages } from '../src/api/contentful/contentful-helper';

interface Props {
  navItems: NavItem[];
  homePage: WebPage;
}

export default function IndexPage({ navItems, homePage }: InferGetStaticPropsType<typeof getStaticProps>) {
  // TODO: accessibility
  // TODO: upgrade nextjs

  return (
    <PageLayout page={homePage} navItems={navItems}>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const homePage: WebPage = await getEntry('yDVLSnrPZOV1f49pc8Nxj');

  const navItems = await getPages({ includeCustomPages: true });

  return { props: { navItems, homePage } };
}
