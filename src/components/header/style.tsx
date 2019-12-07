import styled from 'styled-components';
import theme from '../../styles/theme';
import Typed from 'react-typed';

export const StyledHeader = styled.header`
  display: flex;
  background: ${theme.components.header.background};
  flex-direction: column;
  height: ${theme.components.header.height};
  border-bottom: 2px ${theme.layout.separator} solid;

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 30vh;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-top: -50px;
    font-size: 0.75em;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
  }
`;

export const Title = styled.h1`
  display: block;
  color: ${theme.layout.primaryColor};
  text-shadow: 0 5px 18px rgba(0, 0, 0, 0.07);
`;

export const Description = styled.h2`
  margin: 0;
  opacity: 0.85;
`;

export const StyledTopics = styled(Typed)`
  border-bottom: 3px ${theme.layout.primaryColor} solid;
`;
