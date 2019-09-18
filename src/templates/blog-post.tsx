import React, { FunctionComponent } from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';
import { BlogPostBySlugQuery, PageProps } from '../utils/types';

const BlogPostTemplate: FunctionComponent<PageProps<BlogPostBySlugQuery>> = ({
  data: {
    markdownRemark: { excerpt, html, title, description, createdAt },
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
  location,
  pageContext: { previous, next },
}) => (
  <Layout location={location} title={siteTitle}>
    <SEO title={title} description={description || excerpt} />
    <article>
      <header>
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
          }}
        >
          {createdAt}
        </p>
      </header>
      <section dangerouslySetInnerHTML={{ __html: html }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <footer>
        <Bio />
      </footer>
    </article>

    <nav>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  </Layout>
);

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(slug: { eq: $slug }) {
      id
      excerpt(pruneLength: 160)
      html
      title
      createdAt(formatString: "MMMM DD, YYYY")
      description
    }
  }
`;
