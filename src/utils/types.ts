import { SitePageContext } from '../generated/graphql-types';

export * from '../generated/graphql-types';

export interface PageProps<T = never, C = SitePageContext> {
  data?: T;
  pageContext?: C;
  location?: Location;
  title?: string;
}
