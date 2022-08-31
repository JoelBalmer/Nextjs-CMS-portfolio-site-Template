
import Head from 'next/head'
import React, { ReactNode } from 'react'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './PageLayout.module.scss';
import Image from 'next/image';
import { WebPage } from '../../api/contentful/dtos/web-page';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { sanitize } from 'isomorphic-dompurify';
import { NavItem } from '../../api/contentful/dtos/nav-item';
import { getWebsiteOwnerName } from '../../utils/string-helper';

interface Props {
  page: WebPage;
  navItems: NavItem[];
  children: ReactNode;
}

export default function PageLayout({ page, navItems, children }: Props) {
  const frontendHasUrl = typeof window !== 'undefined' && page?.urlPath;

  const markdown = documentToHtmlString(page.mainBodyText.json);

  return (
    <div className="container">
      <Head>
        <title>{`${getWebsiteOwnerName} | ${page.title}`}</title>
        <meta name="description" content={page.title} key="description" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.title} />
        <meta property="og:site_name" content={`${getWebsiteOwnerName} Arts &amp; Crafts`}  />

        <link rel="icon" type="image/png" href="/favicons/favicon-192.png" />

        {frontendHasUrl && (
          <meta property="og:url" content={`${window.location.origin}/${page.urlPath}`} />
        )}

        {page?.image && (
          <>
            <meta property="og:image" content={page.image.url} />
            <meta name="twitter:card" content={page.image.url} />
            <meta name="twitter:image:alt" content={`${getWebsiteOwnerName} Website Image`} />
          </>
        )}

        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport" />
        <meta httpEquiv="Content-type" content="text/html; charset=UTF-8" key="content-type" />
      </Head>
      <Header navItems={navItems} />
      <main className={styles.main}>
        <section>
          <h1>{page.title}</h1>
          {page?.image && (
            <div className="my-4">
              <Image alt={page.image.description}
                src={page.image.url}
                width={page.image.width}
                height={page.image.height}
                layout='responsive' />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: sanitize(markdown) }} />
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}