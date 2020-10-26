import styled, { css } from 'styled-components';
import { Container } from '../common';
import { Link } from 'gatsby';
import theme from '../../styles/theme';

export const StyledFooter = styled.footer`
  max-width: 100%;
  padding: 36px 0;
  z-index: 700;
  position: relative;
  font-size: 0.9em;
`;

export const FooterContainer = styled(Container)`
  text-align: right;
  line-height: 1.1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Copyright = styled.p`
  margin: 0;
`;

export const StyledNav = styled.nav`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
    margin-right: 25px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const LinkStyle = css`
  color: ${theme.layout.primaryColor};
  text-decoration: none;
`;

export const FooterMenuItem = styled.a`
  ${LinkStyle}
`;

export const FooterMenuLink = styled(Link)`
  ${LinkStyle}
`;
