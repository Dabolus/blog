module.exports = {
  siteMetadata: {
    title: "Giorgio Garasto's Blog",
    siteUrl: `https://giorgio.garasto.blog`,
    description: `A tech blog for %TOPICS%`,
    topics: [`developers`, `geeks`, `nerds`, `the curious`],
    menu: [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: 'Example',
        path: '/page',
      },
    ],
    footerMenu: [
      {
        name: 'RSS',
        path: '/rss.xml',
      },
      {
        name: 'Sitemap',
        path: '/sitemap.xml',
      },
    ],
    search: true,
    author: {
      name: `Giorgio Garasto`,
      description: `Hi! I'm <strong>Giorgio Garasto</strong>, a Software Engineer trying to make the web a better place since 2004.`,
      social: {
        linkedin: `https://linkedin.com/in/GiorgioGarasto`,
        github: `https://github.com/Dabolus`,
        twitter: `https://twitter.com/Dabolus`,
        facebook: `https://fb.me/giorgio.garasto`,
        telegram: `https://t.me/Dabolus`,
      },
    },
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: false,
      },
    },
    `gatsby-transformer-sqip`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Giorgio Garasto's Blog`,
        short_name: `GG's Blog`,
        icons: [
          {
            src: `assets/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `assets/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
        theme_color: `#303030`,
        background_color: `#303030`,
        start_url: `/`,
        display: `standalone`,
        cache_busting_mode: `none`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      // options: {
      //   workboxConfig: {
      //     globPatterns: [`**/icon-path*`],
      //   },
      // },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'content',
        path: 'content',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `themeAssets`,
        path: `${__dirname}/assets`,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: ({ node: { name } }) =>
          `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`,
      },
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
            name: 'en',
          },
        ],
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'content', store: true },
          { name: 'tags', store: true },
          { name: 'series', store: true },
          { name: 'excerpt', store: true },
          { name: 'path', store: true },
        ],
        resolvers: {
          MarkdownRemark: {
            title: (node) => node.frontmatter.title,
            content: (node) => node.html,
            tags: (node) => node.frontmatter.tags,
            series: (node) => node.frontmatter.series,
            excerpt: (node) => node.frontmatter.excerpt,
            path: (node) => node.frontmatter.path,
          },
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true,
              prompt: {
                user: `giorgio`,
                host: `garasto.blog`,
                global: false,
              },
            },
          },
          {
            resolve: `gatsby-remark-music`,
            options: {
              color: `var(--theme-primary-color)`,
            },
          },
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
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
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.excerpt,
                  date: edge.node.frontmatter.created,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___created] },
                filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.md$/" } }
              ) {
                edges {
                  node {
                    html
                    frontmatter {
                      title
                      excerpt
                      path
                      created
                    }
                  }
                }
              }
            }
            `,
            output: `/rss.xml`,
            title: `RSS Feed`,
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
  ],
};
