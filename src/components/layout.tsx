import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';
import { PageProps } from '../utils/types';

declare const __PATH_PREFIX__: string;

const Layout: FunctionComponent<PageProps> = ({
  location: { pathname },
  title,
  children,
}) => (
  <div
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: rhythm(24),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    }}
  >
    <header>
      {pathname === `${__PATH_PREFIX__}/` ? (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h1>
      ) : (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h3>
      )}
    </header>
    <main>{children}</main>
    <footer>
      © {new Date().getFullYear()} Giorgio Garasto, Built with{' '}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </div>
);

export default Layout;
