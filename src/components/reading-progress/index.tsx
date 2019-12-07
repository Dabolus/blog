import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

interface ReadingProgressProps {
  target: RefObject<HTMLElement>;
  color?: string;
  border?: string;
}

const ReadingProgressBar = styled.div<{ color?: string; border?: string }>`
  position: sticky;
  width: 100%;
  height: 5px;
  top: 70px;
  background-color: ${props => props.color || theme.layout.primaryColor};
  box-shadow: 0 0.5px 0.5px
    ${props => props.border || theme.layout.defaultBackground};
  z-index: 500;
  transform-origin: left center;
  will-change: transform;
`;

const ReadingProgress: FunctionComponent<ReadingProgressProps> = ({
  color,
  border,
  target,
}) => {
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const scrollListener = () => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(1);
    }

    setReadingProgress(windowScrollTop / totalHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  });

  return (
    <ReadingProgressBar
      style={{ transform: `scaleX(${readingProgress})` }}
      color={color}
      border={border}
    />
  );
};

export default ReadingProgress;
