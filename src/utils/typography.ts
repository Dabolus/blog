import Typography from 'typography';
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.75,
  scaleRatio: 5 / 2,
  googleFonts: [],
  headerFontFamily: ['Jost*', 'sans-serif'],
  bodyFontFamily: ['Jost*', 'sans-serif'],
  bodyColor: 'var(--theme-primary-color)',
  headerWeight: 800,
  bodyWeight: 300,
  boldWeight: 600,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    'html, body': {
      background: 'var(--theme-content-background)',
    },
    'th, td': {
      borderColor: 'var(--theme-separator)',
    },
    h1: {
      fontFamily: ['Jost*', 'sans-serif'].join(','),
    },
    a: {
      boxShadow: '0 1px 0 0 currentColor',
      color: 'var(--theme-accent)',
      textDecoration: 'none',
    },
    'a:hover,a:active,a.anchor,a.gatsby-resp-image-link': {
      boxShadow: 'none',
    },
    // gatsby-remark-autolink-headers - use theme colours for the link icon
    'a.anchor svg[aria-hidden="true"]': {
      stroke: 'var(--theme-accent)',
    },
    hr: {
      background: 'var(--theme-separator)',
    },
    blockquote: {
      ...scale(1 / 5),
      color: 'var(--theme-secondary-color)',
      fontStyle: 'italic',
      paddingLeft: rhythm(13 / 16),
      marginLeft: rhythm(-1),
      borderLeft: `${rhythm(3 / 16)} solid var(--theme-primary-color)`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    ul: {
      listStyle: 'disc',
    },
    'ul,ol': {
      marginLeft: 0,
    },
    'h1,h2,h3,h4,h5,h6': {
      marginTop: rhythm(2),
    },
    h4: {
      letterSpacing: '0.140625em',
      textTransform: 'uppercase',
    },
    h6: {
      fontStyle: 'italic',
    },
    'mark,ins': {
      background: '#007acc',
      color: 'white',
      padding: `${rhythm(1 / 16)} ${rhythm(1 / 8)}`,
      textDecoration: 'none',
    },
    [MOBILE_MEDIA_QUERY]: {
      'ul,ol': {
        marginLeft: rhythm(1),
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
  }),
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
