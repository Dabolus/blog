import { SitePageContext } from '../generated/graphql-types';

export * from '../generated/graphql-types';

export interface PageProps<T> {
  data: T;
  pageContext: SitePageContext;
  location: Location;
}
