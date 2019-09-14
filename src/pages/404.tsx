import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { PageProps, NotFoundQuery } from '../utils/types';

const NotFoundPage: FunctionComponent<PageProps<NotFoundQuery>> = ({
  data: {
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
  location,
}) => (
  <Layout location={location} title={siteTitle}>
    <SEO title="404: Page Not Found" />
    <h1>Not Found</h1>
    <p>You just hit a route that doesn't exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFound {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
