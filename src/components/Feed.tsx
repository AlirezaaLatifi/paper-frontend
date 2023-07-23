import { useInfiniteQuery } from '@tanstack/react-query';
import CutPaper from './CutPaper';
import WhitePaper from './WhitePaper';
import { getAllPapers } from '../APIs/paper';
import { useEffect, useRef, useState } from 'react';

function Feed() {
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['papers'],
    queryFn: getAllPapers,
    getNextPageParam: (lastPage) => {
      const nexPageParam = lastPage.hasNextPage ? lastPage.nextPage : undefined;
      return nexPageParam;
    },
  });

  const hasNextPageRef = useRef<boolean | undefined>(undefined);
  hasNextPageRef.current = hasNextPage;

  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPageRef.current) {
        fetchNextPage();
      }
    });
  }, []);

  useEffect(() => {
    const currentObserver = observerRef.current!;
    if (lastElement) {
      currentObserver.observe(lastElement);
    }
    return () => {
      if (lastElement) {
        currentObserver.unobserve(lastElement);
      }
    };
  }, [lastElement]);

  if (isLoading)
    return <p className="py-4 text-center uppercase">... loading ...</p>;

  if (isError)
    return (
      <p className="py-4 text-center uppercase">... Something went wrong ...</p>
    );

  return (
    <>
      <div className="flex flex-col gap-4 md:max-w-screen-sm md:mx-auto">
        {data.pages[0].data.length !== 0 ? (
          data.pages.map((page) => {
            return page.data.map((paper) => {
              if (paper.type === 'white') {
                return (
                  <div key={paper.id} ref={setLastElement}>
                    <WhitePaper paper={paper} />
                  </div>
                );
              }
              if (paper.type === 'cut') {
                return (
                  <div key={paper.id} ref={setLastElement}>
                    <CutPaper paper={paper} />
                  </div>
                );
              }
            });
          })
        ) : (
          <p className="py-4 text-center uppercase">
            ... There is no paper yet ...
          </p>
        )}
      </div>
      {isFetchingNextPage && (
        <p className="py-4 text-center uppercase">
          ----------- loading --------------
        </p>
      )}
    </>
  );
}

export default Feed;
