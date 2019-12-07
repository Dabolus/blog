import React, { FunctionComponent } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Series } from '../../utils/models';
import Img from 'gatsby-image';
import slugify from 'slugify';
import {
  StyledSeries,
  StyledSeriesList,
  SeriesArchiveLink,
  SeriesArchiveLinkWrapper,
  SeriesContainer,
  SeriesIcon,
  SeriesListTitle,
  SeriesName,
} from './style';

const SeriesList: FunctionComponent = () => {
  const seriesQuery = useStaticQuery<{
    allSeries: { nodes: Series[] };
  }>(graphql`
    query Series {
      allSeries(filter: { featured: { eq: true } }) {
        nodes {
          name
          icon {
            childImageSharp {
              fixed(height: 55) {
                ...GatsbyImageSharpFixed
              }
            }
            extension
            publicURL
          }
        }
      }
    }
  `);
  const series = seriesQuery.allSeries.nodes;

  return (
    <SeriesContainer>
      <SeriesListTitle>Featured Series</SeriesListTitle>
      <StyledSeriesList>
        {series.map((series, index) => {
          const icon = series.icon;
          return (
            <StyledSeries key={index}>
              <Link to={`/series/${slugify(series.name, { lower: true })}`}>
                {/* gatsby-image doesn't handle SVGs, hence we need to take care of it */}
                {icon.extension !== 'svg' ? (
                  <Img fixed={series.icon.childImageSharp.fixed} />
                ) : (
                  <SeriesIcon src={icon.publicURL} alt={series.name} />
                )}
                <SeriesName>{series.name}</SeriesName>
              </Link>
            </StyledSeries>
          );
        })}
      </StyledSeriesList>
      <SeriesArchiveLinkWrapper>
        <SeriesArchiveLink to={`/series`}>See all series</SeriesArchiveLink>
      </SeriesArchiveLinkWrapper>
    </SeriesContainer>
  );
};

export default SeriesList;
