import styled from 'styled-components';
import theme from '../styles/theme';

export const Container = styled.div`
  width: ${theme.components.container.width};
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;

  @media (max-width: ${theme.breakpoints.xl}) {
    padding: 0 20px;
  }
`;

export const Grid = styled(Container)<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${props => (props.columns ? props.columns : 3)},
    1fr
  );
  grid-gap: 30px;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;
