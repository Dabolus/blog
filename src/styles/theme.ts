import { DefaultTheme } from './default-theme';

const theme: DefaultTheme = {
  layout: {
    primaryColor: 'var(--theme-primary-color)',
    secondaryColor: 'var(--theme-secondary-color)',
    accent: 'var(--theme-accent)',
    defaultBackground: 'var(--theme-default-background)',
    contentBackground: 'var(--theme-content-background)',
    cardBackground: 'var(--theme-card-background)',
    separator: 'var(--theme-separator)',
  },
  breakpoints: {
    xs: `425px`,
    sm: `576px`,
    md: `768px`,
    lg: `992px`,
    xl: `1300px`,
  },
  fonts: {
    base:
      `'Jost*', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, ` +
      `Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  },
  components: {
    container: {
      width: `1260px`,
    },
    header: {
      height: `440px`,
      background: `linear-gradient(-45deg, #44596e, #a4cbb8) repeat scroll 0 0 transparent`,
    },
  },
};

export default theme;
