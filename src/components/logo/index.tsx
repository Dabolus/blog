import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';
import theme from '../../styles/theme';

interface LogoProps {
  title: string;
}

const LogoImage = styled.img`
  max-height: 30px;
  width: 30px;
  margin-right: 45px;

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-right: 15px;
  }
`;

const HomeLink = styled(Link)`
  align-self: center;
  height: 30px;
`;

const Logo: FunctionComponent<LogoProps> = ({ title }) => {
  const logo = useStaticQuery(graphql`
    query {
      file(sourceInstanceName: { eq: "themeAssets" }, name: { eq: "logo" }) {
        publicURL
      }
    }
  `);

  return (
    <HomeLink to={`/`}>
      <LogoImage src={logo.file.publicURL} alt={title} />
    </HomeLink>
  );
};

export default Logo;
