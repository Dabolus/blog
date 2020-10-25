import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';

import TimeIcon from '../icons/time';

import {
  CardContent,
  CardMeta,
  CardReadingTime,
  CardTitle,
  FeaturedImage,
  StyledArticle,
  StyledCard,
} from './style';

export interface CardProps {
  title?: string;
  readingTime?: number;
  path: string;
  featuredImage?: any;
  content?: string;
  meta?: {
    time: string;
    timePretty: string;
    tag: string | null;
    series?: string;
  };
  halfImage?: boolean;
  compact?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}

export const Card: FunctionComponent<CardProps> = ({
  title,
  meta,
  path,
  featuredImage,
  readingTime,
  content,
  halfImage = false,
  compact = false,
  style,
  children,
}) => (
  <StyledArticle style={style}>
    <StyledCard to={path}>
      {/* TODO: Oh boy... */}
      {featuredImage && featuredImage.fixed && (
        <FeaturedImage fixed={featuredImage.fixed} halfImage={halfImage} />
      )}
      {featuredImage && featuredImage.fluid && (
        <FeaturedImage fluid={featuredImage.fluid} halfImage={halfImage} />
      )}
      <CardContent compact={compact}>
        {children}
        <header>
          {meta && (
            <CardMeta>
              {/* {meta.tag && <>{meta.tag}</>} */}
              {meta.series && <>{meta.series}</>}
              {meta.time && <time dateTime={meta.time}>{meta.timePretty}</time>}
            </CardMeta>
          )}
          {title && <CardTitle>{title}</CardTitle>}
          {readingTime && (
            <CardReadingTime>
              <TimeIcon /> ≈{readingTime}min
            </CardReadingTime>
          )}
        </header>
        {content && <p dangerouslySetInnerHTML={{ __html: content }} />}
      </CardContent>
    </StyledCard>
  </StyledArticle>
);
