import React, { FunctionComponent } from 'react';
import Layout from '../components/layout';
import { Container, Grid } from '../components/common';
import { Post } from '../utils/models';
import { Card } from '../components/card';
import styled from 'styled-components';
import SeriesList from '../components/series-list';
import { Link } from 'gatsby';
import SidebarContent from '../components/sidebar-content';
import SEO from '../components/seo';
import theme from '../styles/theme';

interface PostsPageProps {
  pathContext: {
    posts: Post[];
    postsPerPage: number;
  };
  location: Location;
}

const HomeContainer = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 0.25fr;
  grid-column-gap: 30px;

  @media (max-width: ${theme.breakpoints.xl}) {
    grid-template-columns: 1fr;
  }
`;

const PostsContainer = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'latest latest' '. .';
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: -30px;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: block;
    padding: 0;

    article {
      margin-bottom: 30px;
    }
  }
`;

const Sidebar = styled.aside`
  width: 315px;
  padding-top: 30px;

  @media (max-width: ${theme.breakpoints.xl}) {
    margin: 30px auto;
    border-top: 2px ${theme.layout.separator} solid;
    padding: 20px;
    width: 100%;
  }
`;

const ArchiveLinkWrapper = styled.div`
  grid-column: 1 / -1;
  text-align: center;
`;

const ArchiveLink = styled(Link)`
  font-size: 0.8em;
  padding: 10px;
  border-radius: 0.3em;
  background-color: ${theme.layout.accent};
  color: ${theme.layout.primaryOnAccent};
`;

const PostsPage: FunctionComponent<PostsPageProps> = ({
  pathContext,
  location,
}) => {
  const posts = pathContext.posts.slice(0, pathContext.postsPerPage);

  return (
    <Layout>
      <SEO location={location} type={`WebSite`} />
      <HomeContainer>
        <PostsContainer>
          {posts.map((post, index) => (
            <Card
              title={post.frontmatter.title}
              readingTime={post.timeToRead}
              path={post.frontmatter.path}
              featuredImage={
                post.frontmatter.featuredImage
                  ? {
                      ...(post.frontmatter.featuredImage.childImageSharp
                        .fixed && {
                        fixed: {
                          ...post.frontmatter.featuredImage.childImageSharp
                            .fixed,
                          base64:
                            post.frontmatter.featuredImage.childImageSharp.sqip
                              .dataURI,
                        },
                      }),
                      ...(post.frontmatter.featuredImage.childImageSharp
                        .fluid && {
                        fluid: {
                          ...post.frontmatter.featuredImage.childImageSharp
                            .fluid,
                          base64:
                            post.frontmatter.featuredImage.childImageSharp.sqip
                              .dataURI,
                        },
                      }),
                    }
                  : null
              }
              content={post.frontmatter.excerpt}
              key={index}
              meta={{
                time: post.frontmatter.created,
                timePretty: post.frontmatter.createdPretty,
                tag:
                  post.frontmatter.tags.length > 0
                    ? post.frontmatter.tags[0]
                    : null,
                series: post.frontmatter.series,
              }}
              style={{ gridArea: index === 0 ? 'latest' : undefined }}
              halfImage={index === 0}
            />
          ))}
          <ArchiveLinkWrapper>
            <ArchiveLink to={`/archive`}>More posts</ArchiveLink>
          </ArchiveLinkWrapper>
        </PostsContainer>
        <Sidebar>
          <SidebarContent />
        </Sidebar>
      </HomeContainer>
      <SeriesList />
    </Layout>
  );
};

export default PostsPage;
