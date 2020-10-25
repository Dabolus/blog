import { useEffect, useState } from 'react';

const useDisappearingHeader = () => {
  const [latestPosition, setLatestPosition] = useState(0);
  const [scrollFromTop, setScrollFromTop] = useState(0);

  const scrollListener = () => {
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const realScroll = Math.max(0, windowScrollTop);

    setScrollFromTop((previousScrollFromTop) => {
      if (latestPosition < realScroll && scrollFromTop >= -70) {
        return Math.max(
          -70,
          previousScrollFromTop + (latestPosition - realScroll),
        );
      } else if (previousScrollFromTop <= 0) {
        return Math.min(
          0,
          previousScrollFromTop - (realScroll - latestPosition),
        );
      }

      return previousScrollFromTop;
    });

    setLatestPosition(realScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);

    return () => window.removeEventListener('scroll', scrollListener);
  });

  return scrollFromTop;
};

export default useDisappearingHeader;
