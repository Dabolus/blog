import styled from 'styled-components';
import { Link } from 'gatsby';
import theme from '../../styles/theme';

export const SearchBox = styled.div<{ readonly open: boolean }>`
  display: ${props => (props.open ? 'block' : 'none')};
  position: absolute;
  width: 400px;
  background-color: ${theme.layout.primaryColor};
  left: -338px;
  top: 40px;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.03), 0 3px 46px rgba(0, 0, 0, 0.1);

  &::before {
    content: ' ';
    display: block;
    width: 16px;
    height: 16px;
    background-color: ${theme.layout.cardBackground};
    position: absolute;
    top: -8px;
    right: 38px;
    transform: rotate(45deg);

    @media (max-width: ${theme.breakpoints.sm}) {
      right: 17px;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 300px;
    left: -260px;
  }
`;

export const SearchInput = styled.input`
  color: ${theme.layout.primaryColor};
  background-color: ${theme.layout.cardBackground};
  display: block;
  width: 100%;
  border: 0;
  padding: 15px;
  outline: none;
  border-radius: 5px 0;

  &::placeholder {
    color: ${theme.layout.disabledColor};
  }
`;

export const ResultsTitle = styled.h5`
  padding: 5px 15px;
  background-color: ${theme.layout.contentBackground};
  margin: 0;
  color: ${theme.layout.secondaryColor};
`;

export const SearchResults = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 50vh;
  overflow-y: auto;
  white-space: pre-wrap;
`;

export const SearchResult = styled.li<{ selected: boolean }>`
  line-height: 1.4em;
  background-color: ${({ selected }) =>
    selected ? theme.layout.cardBackground : theme.layout.contentBackground};
`;

export const ResultLink = styled(Link)`
  display: block;
  padding: 15px;
`;
export const ResultTitle = styled.h4`
  margin: 0;
`;
