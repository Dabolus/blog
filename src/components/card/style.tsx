import styled from 'styled-components';
import { Link } from 'gatsby';
import theme from '../../styles/theme';
import Img from 'gatsby-image';
import { CardProps } from './index';

export const StyledCard = styled(Link)`
  display: block;
  background-color: ${theme.layout.cardBackground};
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.12);
  transition: 0.5s all;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:hover {
    transform: translate3d(0, -5px, 0);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.12);
  }
`;

export const StyledArticle = styled.article`
  display: inline-block;
  width: 100%;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-area: unset !important;
  }
`;

export const FeaturedImage = styled(Img)<Pick<CardProps, 'halfImage'>>`
  background-position: center;
  background-size: cover;
  max-width: 100%;
  border-top-left-radius: 3px;

  ${(props) =>
    props.halfImage
      ? `
    width: 50%;
    float: left;
    margin-right: 30px;
    height: 320px;
    border-bottom-left-radius: 3px;

    @media (max-width: ${theme.breakpoints.sm}) {
      width: 100%;
      float: none;
      height: 190px;
    }
  `
      : `
    height: 190px;
    max-height: 190px;
    width: 100%;
    border-top-right-radius: 3px;
  `};
`;

export const CardContent = styled.section<{ compact: boolean }>`
  padding: ${(props) => (props.compact ? '10px' : '40px')};

  p {
    margin: 15px 0;
  }

  h2 {
    font-size: 1.2em;
  }
`;

export const CardMeta = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.8em;
  opacity: 0.8;
  line-height: 1em;
`;

export const CardTitle = styled.h2`
  margin: 0;
  padding: 0;
`;

export const CardReadingTime = styled.p`
  font-size: 0.8em;
  margin-bottom: 0;
  color: ${theme.layout.secondaryColor};
  display: flex;
  align-items: center;

  & > svg {
    width: 1.5em;
    height: 1.5em;
    margin-right: 0.4em;
  }
`;
