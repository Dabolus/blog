import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import styledNormalize from 'styled-normalize';
import * as jostStyles from './fonts/jost/jost.css';
import * as prismTomorrowThemeStyles from 'prismjs/themes/prism-tomorrow.css';
import * as prismLineNumberStyles from 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import * as prismCommandLineStyles from 'prismjs/plugins/command-line/prism-command-line.css';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  ${jostStyles}
  ${prismTomorrowThemeStyles}
  ${prismLineNumberStyles}
  ${prismCommandLineStyles}

  html {
    --theme-primary-color: #fff;
    --theme-secondary-color: rgba(255, 255, 255, 0.7);
    --theme-disabled-color: rgba(255, 255, 255, 0.5);
    --theme-accent: #80cbc4;
    --theme-primary-on-accent: rgba(0, 0, 0, 0.87);
    --theme-secondary-on-accent: rgba(0, 0, 0, 0.60);
    --theme-default-background: #212121;
    --theme-content-background: #303030;
    --theme-card-background: #424242;
    --theme-separator: rgba(255, 255, 255, 0.12);

    @media (light-level: washed), (prefers-color-scheme: light) {
      --theme-primary-color: rgba(0, 0, 0, 0.87);
      --theme-secondary-color: rgba(0, 0, 0, 0.60);
      --theme-disabled-color: rgba(0, 0, 0, 0.38);
      --theme-accent: #005b4f;
      --theme-primary-on-accent: #fff;
      --theme-secondary-on-accent: rgba(255, 255, 255, 0.7);
      --theme-default-background: #f0f0f0;
      --theme-content-background: #fafafa;
      --theme-card-background: #fff;
      --theme-separator: rgba(0, 0, 0, 0.12);
    }
  }

  html, body {
    box-sizing: border-box;
    background-color: ${theme.layout.defaultBackground};
    color: ${theme.layout.primaryColor};
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
    color: ${theme.layout.primaryColor};
    text-decoration: none;
  }

  .gatsby-highlight {
    max-width: 100% !important;
    background-color: #2d2d2d;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
  }

  .gatsby-highlight-code-line {
    background-color: #353631;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
  }

  pre[class*='language-'].line-numbers {
    padding: 0;
    padding-left: 2.8em;
    overflow: initial;
  }
`;

export default GlobalStyle;
