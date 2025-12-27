import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = (callback: () => void, loading: boolean) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isFetching) {
        setIsFetching(true);
        callback();
      }
    };

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, loading, isFetching]);

  useEffect(() => {
    if (!loading && isFetching) {
      setIsFetching(false);
    }
  }, [loading, isFetching]);

  return loadMoreRef;
};
