import React, { FunctionComponent } from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import { Post, Series } from '../utils/models';
import Subheader from '../components/subheader';
import SEO from '../components/seo';
import theme from '../styles/theme';
import PostGrid from '../components/post-grid';

interface SeriesTemplateProps {
  data: {
    series: Series;
    posts: {
      edges: Array<{ node: Post }>;
    };
  };
  location: Location;
}

const SeriesTemplate: FunctionComponent<SeriesTemplateProps> = ({
  data,
  location,
}) => {
  let series = data.series;
  const posts = data.posts.edges.map(node => node.node);

  if (!series && posts.length > 0) {
    series = {
      name: posts[0].frontmatter.series,
      color: theme.layout.primaryColor,
      icon: null,
      featured: false,
    };
  }

  return (
    <Layout bigHeader={false}>
      <SEO title={series.name} location={location} type={`Series`} />
      <Subheader
        title={series.name}
        subtitle={`${posts.length} posts`}
        backgroundColor={series.color}
      />
      <PostGrid posts={posts} />
    </Layout>
  );
};

export default SeriesTemplate;

export const query = graphql`
  query($series: String!) {
    series: series(name: { eq: $series }) {
      name
      color
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(posts)/.*\\\\.md$/" }
        frontmatter: { series: { eq: $series } }
      }
      sort: { fields: frontmatter___created, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            series
            excerpt
            created
            createdPretty: created(formatString: "DD MMMM, YYYY")
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 800, quality: 100) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
