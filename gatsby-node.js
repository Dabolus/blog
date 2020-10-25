const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const slugify = require('slugify');

/**
 * Before booting up Gatsby make sure the content path directory exists.
 */
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();

  const contentPath = themeOptions.contentPath || 'content';
  const dir = path.join(program.directory, contentPath);

  if (!fs.existsSync(dir)) {
    mkdirp(dir);
  }
};

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const postsPerPage = themeOptions.postsPerPage
    ? themeOptions.postsPerPage
    : 5;

  const result = await graphql(`
    query {
      pages: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(/pages/).*.(md)/" } }
      ) {
        edges {
          node {
            frontmatter {
              title
              path
            }
            html
          }
        }
      }
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.md$/" } }
        sort: { fields: frontmatter___created, order: DESC }
      ) {
        edges {
          node {
            id
            headings {
              depth
            }
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
                  fluid(maxWidth: 500, quality: 70) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
            html
          }
        }
      }
      tags: allTags {
        edges {
          node {
            name
          }
        }
      }
      series: allSeries {
        edges {
          node {
            name
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  const tags = [];
  const series = [];
  const posts = result.data.posts.edges.map((node) => node.node);
  const pages = result.data.pages.edges.map((node) => node.node);
  const availableTags =
    result.data.tags.edges.map((node) => node.node).map((t) => t.name) || [];
  const availableSeries =
    result.data.series.edges.map((node) => node.node).map((t) => t.name) || [];

  // Create a route for every single post (located in `content/posts`)
  posts.forEach((post) => {
    if (post.frontmatter.tags) {
      tags.push(...post.frontmatter.tags);
    }
    if (post.frontmatter.series) {
      series.push(post.frontmatter.series);
    }
    const primaryTag =
      post.frontmatter.tags.length > 0 ? post.frontmatter.tags[0] : null;
    actions.createPage({
      path: post.frontmatter.path,
      component: require.resolve(`./src/templates/post.tsx`),
      context: {
        postId: post.id,
        primaryTag: primaryTag,
        series: post.frontmatter.series,
      },
    });
  });

  // Create a route for every single page (located in `content/pages`)
  pages.forEach((page) => {
    actions.createPage({
      path: page.frontmatter.path,
      component: require.resolve(`./src/templates/page.tsx`),
      context: {
        page,
      },
    });
  });

  // Create a route for every single route (from `content/tags.yml` and the tags found in posts)
  [...new Set(tags)].concat(availableTags).forEach((tag) => {
    const slugified = slugify(tag, { lower: true });
    actions.createPage({
      path: `/tag/${slugified}`,
      component: require.resolve(`./src/templates/tag.tsx`),
      context: {
        tag,
      },
    });
  });

  // Create a route for every single route (from `content/series.yml` and the series found in posts)
  [...new Set(series)].concat(availableSeries).forEach((series) => {
    const slugified = slugify(series, { lower: true });
    actions.createPage({
      path: `/series/${slugified}`,
      component: require.resolve(`./src/templates/series.tsx`),
      context: {
        series,
      },
    });
  });

  // The index page
  actions.createPage({
    path: '/',
    component: require.resolve(`./src/templates/posts.tsx`),
    context: {
      posts,
      postsPerPage,
    },
  });
};
