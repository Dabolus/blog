import React, { FunctionComponent } from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import { PageProps, BlogHomeQuery } from '../utils/types';

const BlogHome: FunctionComponent<PageProps<BlogHomeQuery>> = ({
  data: {
    site: {
      siteMetadata: { title: siteTitle },
    },
    allMarkdownRemark: { edges: posts },
  },
  location,
}) => (
  <Layout location={location} title={siteTitle}>
    <SEO title="All posts" />
    <Bio />
    {posts.map(({ node: { title, createdAt, description, slug, excerpt } }) => {
      return (
        <article key={slug}>
          <header>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: 'none' }} to={slug}>
                {title || slug}
              </Link>
            </h3>
            <small>{createdAt}</small>
          </header>
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: description || excerpt,
              }}
            />
          </section>
        </article>
      );
    })}
  </Layout>
);

export default BlogHome;

export const pageQuery = graphql`
  query BlogHome {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          excerpt
          slug
          createdAt(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
