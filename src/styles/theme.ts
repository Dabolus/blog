import { DefaultTheme } from './default-theme';

const theme: DefaultTheme = {
  layout: {
    dark: {
      primaryColor: '#fff',
      secondaryColor: 'rgba(255, 255, 255, 0.7)',
      accent: '#ff6659',
      defaultBackground: '#212121',
      contentBackground: '#303030',
      cardBackground: '#424242',
      separator: 'rgba(255, 255, 255, 0.12)',
    },
    light: {
      primaryColor: 'rgba(0, 0, 0, 0.87)',
      secondaryColor: 'rgba(0, 0, 0, 0.54)',
      accent: '#d32f2f',
      defaultBackground: '#f0f0f0',
      contentBackground: '#fafafa',
      cardBackground: '#fff',
      separator: 'rgba(0, 0, 0, 0.12)',
    },
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
