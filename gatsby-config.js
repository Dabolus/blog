require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Giorgio Garasto's Blog",
    author: 'Giorgio Garasto',
    description: 'Check out my Software Engineer experiences and advices.',
    siteUrl: 'https://giorgio.garasto.blog/',
    social: {
      twitter: 'Dabolus',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-firestore',
      options: {
        credential: JSON.parse(process.env.FIREBASE_CREDENTIALS),
        types: [
          {
            type: 'Post',
            collection: 'posts',
            map: ({ createdAt, updatedAt, ...post }) => ({
              ...post,
              createdAt: createdAt.toDate(),
              updatedAt: updatedAt.toDate(),
            }),
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-firestore-to-post',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
            },
          },
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        //trackingId: 'ADD YOUR TRACKING ID HERE',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          query RSSMetadata {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: edge.node.excerpt,
                  date: edge.node.createdAt,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            query: `
              query RSSFeed {
                allMarkdownRemark(sort: { fields: [createdAt], order: DESC }) {
                  edges {
                    node {
                      excerpt
                      slug
                      html
                      createdAt
                      title
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Giorgio Garasto's Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "Giorgio Garasto's Blog",
        short_name: 'GG Blog',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'assets/gatsby-icon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-generate-typings',
      options: {
        dest: 'src/generated/graphql-types.ts',
      },
    },
  ],
};
