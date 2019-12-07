export interface DefaultTheme {
  layout: {
    primaryColor: string;
    secondaryColor: string;
    accent: string;
    defaultBackground: string;
    contentBackground: string;
    cardBackground: string;
    separator: string;
  };
  fonts: {
    base: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  components: {
    container: {
      width: string;
    };
    header: {
      height: string;
      background: string;
    };
  };
}
