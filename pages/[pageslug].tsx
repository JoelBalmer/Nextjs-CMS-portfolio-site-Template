import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from 'querystring';
import PageLayout from "../src/components/PageLayout/PageLayout";
import { WebPage } from "../src/api/contentful/dtos/web-page";
import { NavItem } from "../src/api/contentful/dtos/nav-item";
import { getPages } from '../src/api/contentful/contentful-helper';

interface Props {
  page: WebPage;
  navItems: NavItem[];
}

interface PagePathParams extends ParsedUrlQuery {
  'pageslug': string;
}

interface PagePath {
  params: PagePathParams;
  locale?: string;
}

export default function GenericPage({ page, navItems }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout page={page} navItems={navItems}>
    </PageLayout>
  );
}

export const getStaticPaths: GetStaticPaths<PagePathParams> = async () => {  
  const pages = await getAllPages({ includeCustomPages: false });

  const pagePaths: PagePath[] = pages.map(page => ({
    params: { pageslug: page.urlPath || '' }
  }));

  return { paths: pagePaths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, PagePathParams> = async (context) => {    
  const pages = await getAllPages({ includeCustomPages: true });
  
  const page = pages.find(p => p.urlPath === context.params?.pageslug) || {} as WebPage;
  
  const navItems: NavItem[] = pages.map(page => ({ title: page.title, urlPath: page.urlPath }));

  return { props: { page, navItems } };
}

const getAllPages = async (options: {includeCustomPages: boolean}): Promise<WebPage[]> => {
  // Should only get called on server, because it's only called inside getStaticProps and getStaticPaths
  return await getPages(options);
};
