import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import styledNormalize from 'styled-normalize';
import * as prismStyle from 'prismjs/themes/prism-okaidia.css';
import * as jostStyle from './fonts/jost/jost.css';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  ${prismStyle}
  ${jostStyle}

  html {
    box-sizing: border-box;
    --theme-primary-color: #fff;
    --theme-secondary-color: rgba(255, 255, 255, 0.7);
    --theme-accent: #ff6659;
    --theme-default-background: #212121;
    --theme-content-background: #303030;
    --theme-card-background: #424242;
    --theme-separator: rgba(255, 255, 255, 0.12);

    @media (light-level: washed), (prefers-color-scheme: light) {
      --theme-primary-color: rgba(0, 0, 0, 0.87);
      --theme-secondary-color: rgba(0, 0, 0, 0.54);
      --theme-accent: #d32f2f;
      --theme-default-background: #f0f0f0;
      --theme-content-background: #fafafa;
      --theme-card-background: #fff;
      --theme-separator: rgba(0, 0, 0, 0.12);
    }
  }

  body {
    font-family: ${theme.fonts.base};
    line-height: 1.9em;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    outline: none;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  .gatsby-highlight {
    max-width: 100% !important;
  }

  .gatsby-highlight-code-line {
    background-color: #353631;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
  }
`;

export default GlobalStyle;
