import React, { createRef, FunctionComponent, useState } from 'react';
import Layout from '../components/layout';
import { Post, Tag, Series } from '../utils/models';
import { Container } from '../components/common';
import styled from 'styled-components';
import Toc from '../components/toc';
import Img from 'gatsby-image';
import ReadingProgress from '../components/reading-progress';
import theme from '../styles/theme';
import { graphql, Link } from 'gatsby';
import slugify from 'slugify';
import Bio from '../components/bio';
import Comments from '../components/comments';
import SEO from '../components/seo';
import TimeIcon from '../components/icons/time';
import { FaAlignJustify, FaTimes } from 'react-icons/fa';

interface PostTemplateProps {
  data: {
    primaryTag: Tag | null;
    series?: Series;
    post: Post;
  };
  location: Location;
}

const PostContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding: 0 !important;
`;

const LeftSidebar = styled.div<{ show?: boolean }>`
  min-width: 255px;
  max-width: 225px;
  transition: opacity 0.5s, z-index 0.5s;

  @media (max-width: ${theme.breakpoints.xl}) {
    position: fixed;
    opacity: ${({ show }) => (show ? 1 : 0)};
    z-index: ${(props) => (props.show ? 1000 : -1)};
    pointer-events: ${({ show }) => (show ? 'unset' : 'none')};
    background-color: ${theme.layout.contentBackground};
    width: 100% !important;
    max-width: 100%;
    padding: 0 20px;
    margin-top: -5px;
    height: calc(100vh - 70px);
  }
`;

const PostContent = styled.div`
  margin-top: -5px;
  border-right: 1px ${theme.layout.separator} solid;
  border-left: 1px ${theme.layout.separator} solid;
  background-color: ${theme.layout.contentBackground};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.03), 0 3px 46px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 1035px;
  max-width: 100%;

  li > a,
  p > a {
    color: ${theme.layout.accent};
    border-bottom: 2px ${theme.layout.accent} solid;
  }

  pre {
    margin: 30px 0;
  }

  blockquote {
    border-left: 4px ${theme.layout.primaryColor} solid;
    background-color: ${theme.layout.cardBackground};
    margin: 30px 0;
    padding: 5px 20px;
    border-radius: 0.3em;
  }

  table {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.75rem;
    font-size: 1rem;
    line-height: 1.75rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    text-align: left;
    border-bottom: 1px solid ${theme.layout.separator};
    padding: 1rem;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  h3::before,
  h4::before,
  h5::before,
  h6::before {
    display: block;
    content: ' ';
    height: 90px;
    margin-top: -90px;
    visibility: hidden;
  }

  h2 {
    border-top: 1px solid ${theme.layout.separator};
    margin-top: 44px;
    padding-top: 40px;
    line-height: 1.2;
  }

  code[class*='language-text'] {
    padding: 5px;
  }

  p > img {
    max-width: 100%;
    border-radius: 0.3em;
    margin: 30px 0;
  }

  hr {
    border-top: 1px solid ${theme.layout.separator};
    border-bottom: 0;
    margin-top: 44px;
    margin-bottom: 40px;
  }

  .gatsby-resp-image-link {
    margin: 30px 0;
    max-width: 100%;

    .gatsby-resp-image-image {
      border-radius: 0.3em;
    }
  }
`;

const TocWrapper = styled.div`
  position: sticky;
  top: 70px;
  padding: 40px 30px 40px 0;
`;

const PostHeader = styled.header`
  padding: 40px;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 20px;
  }
`;

const FeaturedImage = styled(Img)`
  border-radius: 0;

  @media (max-width: ${theme.breakpoints.xl}) {
    margin-left: -1px;
    margin-right: -1px;
  }
`;

const StyledPost = styled.section`
  padding: 40px;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 20px;
  }
`;

const PostMeta = styled.section`
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
  font-size: 0.9em;
`;

const PostTitle = styled.h1`
  margin: 0;
  padding: 0;
`;

const PostReadingTime = styled.p`
  font-size: 0.8em;
  margin-bottom: 0;
  color: ${theme.layout.secondaryColor};
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 0.4em;
  }
`;

const PostFooter = styled.footer`
  background-color: ${theme.layout.cardBackground};
  font-size: 0.8em;
  color: ${theme.layout.secondaryColor};
  padding: 40px;
  line-height: 1em;

  p {
    margin: 5px 0;
  }
`;

const FooterSeriesLink = styled(Link)`
  color: ${theme.layout.accent} !important;
  text-decoration: none;
  border-bottom: 0 !important;
`;

const PostAddition = styled.section`
  background-color: ${theme.layout.defaultBackground};
  border-top: 1px ${theme.layout.separator} solid;
  border-bottom: 1px ${theme.layout.separator} solid;
  z-index: 700;
  position: relative;
  padding: 40px;
`;

const PostAdditionContent = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

const BioWrapper = styled.div`
  width: 50%;
  margin: auto;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const ToggleTocButton = styled.button`
  display: flex;
  position: fixed;
  justify-content: center;
  right: 20px;
  bottom: 20px;
  border-radius: 100%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.03), 0 3px 46px rgba(0, 0, 0, 0.1);
  border: 0;
  z-index: 5000;
  width: 50px;
  height: 50px;
  background-color: #20232a;
  color: #fff;
  outline: none;

  @media (min-width: ${theme.breakpoints.xl}) {
    display: none;
  }
`;

const PostTemplate: FunctionComponent<PostTemplateProps> = ({
  data,
  location,
}) => {
  const [showToc, setShowToc] = useState<boolean>(false);
  const post = data.post;
  const readingProgressRef = createRef<HTMLElement>();
  const primaryTag = data.primaryTag;
  const toggleToc = () => setShowToc(!showToc);

  return (
    <Layout bigHeader={false}>
      <SEO
        location={location}
        title={post.frontmatter.title}
        publishedAt={post.frontmatter.created}
        updatedAt={post.frontmatter.updated}
        tags={post.frontmatter.tags}
        series={post.frontmatter.series}
        description={post.frontmatter.excerpt}
        image={
          post.frontmatter.featuredImage
            ? post.frontmatter.featuredImage.childImageSharp.fluid.src
            : null
        }
      />
      <ReadingProgress
        target={readingProgressRef}
        color={primaryTag ? primaryTag.color : undefined}
      />
      <PostContainer>
        {post.headings.find((h) => h.depth > 1) && (
          <>
            <LeftSidebar show={showToc}>
              <TocWrapper>
                <Toc onClick={toggleToc} />
              </TocWrapper>
            </LeftSidebar>
            <ToggleTocButton
              role={`button`}
              aria-label={`Toggle table of contents`}
              onClick={toggleToc}
            >
              {showToc ? <FaTimes /> : <FaAlignJustify />}
            </ToggleTocButton>
          </>
        )}
        <PostContent>
          <article className={`post`} ref={readingProgressRef}>
            <PostHeader>
              <PostMeta>
                {post.frontmatter.series && (
                  <Link
                    to={`/series/${slugify(post.frontmatter.series, {
                      lower: true,
                    })}`}
                  >
                    {post.frontmatter.series}
                  </Link>
                )}
                <time dateTime={post.frontmatter.created}>
                  {post.frontmatter.createdPretty}
                </time>
              </PostMeta>
              <PostTitle>{post.frontmatter.title}</PostTitle>
              <PostReadingTime>
                <TimeIcon />
                Estimated reading time: ≈{post.timeToRead}min
              </PostReadingTime>
            </PostHeader>
            {post.frontmatter.featuredImage && (
              <FeaturedImage
                fluid={{
                  ...post.frontmatter.featuredImage.childImageSharp.fluid,
                  base64:
                    post.frontmatter.featuredImage.childImageSharp.sqip.dataURI,
                }}
              />
            )}
            <StyledPost
              dangerouslySetInnerHTML={{ __html: post.html }}
              className={`post`}
            />
            <PostFooter>
              <p>
                Published
                {post.frontmatter.series && (
                  <>
                    &nbsp;under&nbsp;
                    <FooterSeriesLink
                      to={`/series/${slugify(post.frontmatter.series, {
                        lower: true,
                      })}`}
                    >
                      {post.frontmatter.series}
                    </FooterSeriesLink>
                  </>
                )}
                &nbsp;on{' '}
                <time dateTime={post.frontmatter.created}>
                  {post.frontmatter.createdPretty}
                </time>
                .
              </p>
              {post.frontmatter.updated !== post.frontmatter.created && (
                <p>
                  Last updated on{' '}
                  <time dateTime={post.frontmatter.updated}>
                    {post.frontmatter.updatedPretty}
                  </time>
                  .
                </p>
              )}
            </PostFooter>
          </article>
        </PostContent>
      </PostContainer>
      <PostAddition>
        <PostAdditionContent>
          <BioWrapper>
            <Bio textAlign={`center`} showName={true} />
          </BioWrapper>
        </PostAdditionContent>
      </PostAddition>
      <Comments id={post.id} />
    </Layout>
  );
};

export default PostTemplate;

export const query = graphql`
  query PrimaryTag($postId: String!, $primaryTag: String!) {
    post: markdownRemark(id: { eq: $postId }) {
      id
      headings {
        depth
      }
      timeToRead
      frontmatter {
        title
        path
        tags
        series
        excerpt
        created
        createdPretty: created(formatString: "DD MMMM, YYYY")
        updated
        updatedPretty: updated(formatString: "DD MMMM, YYYY")
        featuredImage {
          childImageSharp {
            sqip(numberOfPrimitives: 25, blur: 6) {
              dataURI
            }
            fluid(maxWidth: 800, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
      html
    }
    primaryTag: tags(name: { eq: $primaryTag }) {
      name
      color
    }
  }
`;
