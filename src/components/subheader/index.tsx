import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Container } from '../common';
import theme from '../../styles/theme';

interface SubheaderProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
}

const StyledSubheader = styled.div<
  Pick<SubheaderProps, 'backgroundColor' | 'textColor'>
>`
  background-color: ${props =>
    props.backgroundColor
      ? props.backgroundColor
      : theme.layout.contentBackground};
  color: ${props =>
    props.textColor ? props.textColor : theme.layout.primaryColor};
  display: flex;
  align-items: center;
  height: 90px;
  margin-bottom: 30px;
`;

const SubheaderTitle = styled.h1`
  font-size: 1.2em;
  font-weight: bold;
  color: ${theme.layout.primaryColor};
  margin: 0;
  line-height: 1em;
`;

const SubheaderSubtitle = styled.small`
  font-weight: normal;
  display: block;
  opacity: 0.9;
`;

const Subheader: FunctionComponent<SubheaderProps> = ({
  title,
  subtitle,
  backgroundColor,
  textColor,
}) => (
  <StyledSubheader backgroundColor={backgroundColor} textColor={textColor}>
    <Container>
      <SubheaderTitle>
        {title}
        <SubheaderSubtitle>{subtitle}</SubheaderSubtitle>
      </SubheaderTitle>
    </Container>
  </StyledSubheader>
);

export default Subheader;
