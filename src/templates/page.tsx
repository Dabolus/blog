import React, { FunctionComponent } from 'react';
import Layout from '../components/layout';
import Subheader from '../components/subheader';
import { Page } from '../utils/models';
import theme from '../styles/theme';
import { Container } from '../components/common';
import styled from 'styled-components';
import PageSidebarContent from '../components/page-sidebar-content';
import SEO from '../components/seo';

interface PageTemplateProps {
  pathContext: {
    page: Page;
  };
  location: Location;
}

const PageContainer = styled(Container)`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }

  p:first-child {
    margin-top: 0;
  }

  li > a,
  p > a {
    color: ${theme.layout.accent};
    border-bottom: 2px ${theme.layout.accent} solid;
  }
`;

const PageSidebar = styled.aside`
  margin-left: 50px;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

const PageTemplate: FunctionComponent<PageTemplateProps> = ({
  pathContext,
  location,
}) => {
  const page = pathContext.page;

  return (
    <Layout bigHeader={false}>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.excerpt}
        location={location}
      />
      <Subheader
        title={page.frontmatter.title}
        backgroundColor={theme.layout.cardBackground}
      />
      <PageContainer>
        <section dangerouslySetInnerHTML={{ __html: page.html }} />
        <PageSidebar>
          <PageSidebarContent />
        </PageSidebar>
      </PageContainer>
    </Layout>
  );
};

export default PageTemplate;
