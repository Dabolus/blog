import React, { FunctionComponent } from 'react';
import { Post } from '../../utils/models';
import { Grid } from '../common';
import { Card } from '../card';

interface PostGridProps {
  posts: Post[];
}

const PostGrid: FunctionComponent<PostGridProps> = ({ posts }) => (
  <Grid>
    {posts.map((post, index) => (
      <Card
        title={post.frontmatter.title}
        readingTime={post.timeToRead}
        path={post.frontmatter.path}
        featuredImage={
          post.frontmatter.featuredImage
            ? {
                ...(post.frontmatter.featuredImage.childImageSharp.fixed && {
                  fixed: {
                    ...post.frontmatter.featuredImage.childImageSharp.fixed,
                    base64:
                      post.frontmatter.featuredImage.childImageSharp.sqip
                        .dataURI,
                  },
                }),
                ...(post.frontmatter.featuredImage.childImageSharp.fluid && {
                  fluid: {
                    ...post.frontmatter.featuredImage.childImageSharp.fluid,
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
            post.frontmatter.tags.length > 0 ? post.frontmatter.tags[0] : null,
          series: post.frontmatter.series,
        }}
      />
    ))}
  </Grid>
);

export default PostGrid;
