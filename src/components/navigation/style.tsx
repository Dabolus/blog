import styled from 'styled-components';
import { Container } from '../common';
import theme from '../../styles/theme';
import { Link } from 'gatsby';

export const NavContainer = styled.div<{ dark?: boolean }>`
  z-index: 1000;
  ${(props) =>
    props.dark &&
    `
    background-color: ${theme.layout.accent};
    position: sticky;
    top: 0;
    box-shadow: 0 0 3px rgba(0,0,0,.03), 0 3px 46px rgba(0,0,0,.07);
  `};
`;

export const Nav = styled(Container)`
  display: flex;
  position: relative;
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 90%;
  }
`;

export const NavMenu = styled.ul<{ mobile?: boolean }>`
  align-self: center;
  list-style-type: none;
  margin: 0;
  padding: 0;

  ${(props) =>
    props.mobile &&
    `
    @media (max-width: ${theme.breakpoints.sm}) {
      width: 80%;
      overflow-x: auto;
      overflow-y: hidden;
      mask-image: linear-gradient(to right, transparent, #000 25px, #000 90%, transparent);
    }
  `}
`;

export const NavMenuItem = styled.li`
  cursor: pointer;
  display: inline-block;
  border: 0;
  background: transparent;
  outline: none;
  text-decoration: none;
`;

export const NavLink = styled(Link)`
  color: ${theme.layout.secondaryOnAccent};
  padding: 16px;
  transition: color 0.5s;

  &:hover {
    color: ${theme.layout.primaryOnAccent};
  }
`;

export const ExternalNavLink = styled.a`
  color: ${theme.layout.secondaryOnAccent};
  padding: 16px;
  transition: color 0.5s;

  &:hover {
    color: ${theme.layout.primaryOnAccent};
  }

  svg {
    width: 0.8em;
    height: 0.8em;
  }
`;

export const SearchContainer = styled.div`
  align-self: center;
  position: relative;
`;

export const ToggleSearchButton = styled.button`
  cursor: pointer;
  color: ${theme.layout.secondaryOnAccent};
  background: none;
  outline: none;
  border: 0;
  transition: color 0.5s;

  &:hover {
    color: ${theme.layout.primaryOnAccent};
  }
`;
