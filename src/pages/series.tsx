import React, { FunctionComponent } from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import Subheader from '../components/subheader';
import { Series } from '../utils/models';
import { Card } from '../components/card';
import slugify from 'slugify';
import { Grid } from '../components/common';
import styled from 'styled-components';
import SEO from '../components/seo';

interface SeriesPageProps {
  data: {
    allSeries: {
      edges: Array<{ node: Series }>;
    };
  };
  location: Location;
}

const SeriesSvgIcon = styled.img`
  max-height: 55px;
`;

const SeriesName = styled.p`
  margin: 0 !important;
`;

const SeriesPage: FunctionComponent<SeriesPageProps> = ({ data, location }) => {
  const series = data.allSeries.edges.map((node) => node.node);

  return (
    <Layout bigHeader={false}>
      <SEO location={location} title={`Series`} type={`Series`} />
      <Subheader title={`Series`} subtitle={`${series.length} series`} />
      <Grid columns={6}>
        {series.map((series, index) => (
          <Card
            key={index}
            path={`/series/${slugify(series.name, { lower: true })}`}
            compact={true}
            style={{ textAlign: 'center' }}
          >
            <SeriesSvgIcon src={series.icon.publicURL} alt={series.name} />
            <SeriesName>{series.name}</SeriesName>
          </Card>
        ))}
      </Grid>
    </Layout>
  );
};

export default SeriesPage;

export const query = graphql`
  query {
    allSeries {
      edges {
        node {
          name
          icon {
            publicURL
          }
        }
      }
    }
  }
`;
