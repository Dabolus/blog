import React, { FunctionComponent } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Card } from '../card';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { Post } from '../../utils/models';

const LatestPosts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  width: 310px;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const PageSidebarContent: FunctionComponent = () => {
  const latestPosts = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.md$/" } }
        sort: { fields: frontmatter___created, order: DESC }
        limit: 3
      ) {
        edges {
          node {
            id
            timeToRead
            frontmatter {
              title
              path
              tags
              series
              created
              createdPretty: created(formatString: "DD MMMM, YYYY")
              excerpt
              featuredImage {
                childImageSharp {
                  fixed(width: 315, height: 100) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const posts: Post[] = latestPosts.posts.edges.map((node) => node.node);

  return (
    <>
      <h3>Latest posts</h3>
      <LatestPosts>
        {posts.map((post, index) => (
          <Card
            title={post.frontmatter.title}
            readingTime={post.timeToRead}
            featuredImage={post.frontmatter.featuredImage.childImageSharp}
            path={post.frontmatter.path}
            key={index}
            compact={true}
            meta={{
              time: post.frontmatter.created,
              timePretty: post.frontmatter.createdPretty,
              tag:
                post.frontmatter.tags.length > 0
                  ? post.frontmatter.tags[0]
                  : null,
              series: post.frontmatter.series,
            }}
          />
        ))}
      </LatestPosts>
    </>
  );
};

export default PageSidebarContent;
