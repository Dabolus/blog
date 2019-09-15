/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { SeoQuery, PageProps } from '../utils/types';

interface SEOMetadata {
  name: string;
  content: string;
}

interface SEOProps extends PageProps {
  description?: string;
  lang?: string;
  meta?: readonly SEOMetadata[];
  title: string;
}

const SEO: FunctionComponent<SEOProps> = ({
  description = '',
  lang = 'en',
  meta = [],
  title,
}) => {
  const {
    site: {
      siteMetadata: { title: metaTitle, description: metaDescription, author },
    },
  }: SeoQuery = useStaticQuery(
    graphql`
      query SEO {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );

  const pageDescription = description || metaDescription;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${metaTitle}`}
      meta={[
        {
          name: 'description',
          content: pageDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: pageDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: pageDescription,
        },
        ...meta,
      ]}
    />
  );
};

export default SEO;
