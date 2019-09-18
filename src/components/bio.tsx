/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image, { FixedObject } from 'gatsby-image';
import { rhythm } from '../utils/typography';
import { BioQuery } from '../utils/types';

const Bio = () => {
  const {
    site: {
      siteMetadata: {
        author,
        social: { twitter },
      },
    },
    avatar: {
      childImageSharp: { fixed },
    },
  }: BioQuery = useStaticQuery(graphql`
    query Bio {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={fixed as FixedObject}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: '100%',
        }}
        imgStyle={{
          borderRadius: '50%',
        }}
      />
      <p>
        Hi! I'm <strong>{author}</strong>, a Software Engineer trying to make
        the web a better place since 2004.{' '}
        <a href={`https://twitter.com/${twitter}`}>Follow me on Twitter</a>
      </p>
    </div>
  );
};

export default Bio;
