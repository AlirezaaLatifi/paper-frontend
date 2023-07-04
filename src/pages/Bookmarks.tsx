import { useEffect, useState } from 'react';
import { Paper, getAllPapers } from '../APIs/paper';
import WhitePaper from '../components/WhitePaper';
import CutPaper from '../components/CutPaper';

function Bookmarks() {
  const [bookmarkedPapers, setBookmarkedPapers] = useState<Paper[]>([]);

  const onBookmark = () => {
    const bookmarkedIDs: number[] = JSON.parse(
      localStorage.getItem('bookmarks') as string
    );
    getAllPapers().then((papers) => {
      setBookmarkedPapers(
        papers.filter((paper) => bookmarkedIDs.includes(paper.id))
      );
    });
  };

  useEffect(() => {
    onBookmark();
  }, []);

  return (
    <div className="flex flex-col gap-4 md:max-w-screen-sm md:mx-auto">
      {bookmarkedPapers?.length ? (
        bookmarkedPapers.map((paper) => {
          if (paper.type === 'white') {
            return (
              <WhitePaper
                onPapersUpdate={() => {}}
                key={paper.id}
                paper={paper}
                onBookmark={onBookmark}
              />
            );
          }
          if (paper.type === 'cut') {
            return (
              <CutPaper
                onPapersUpdate={() => {}}
                key={paper.id}
                paper={paper}
                onBookmark={onBookmark}
              />
            );
          }
          return '';
        })
      ) : (
        <p className="py-4 text-center uppercase">
          {!bookmarkedPapers
            ? '... loading ...'
            : '... There is no paper yet ...'}
        </p>
      )}
    </div>
  );
}

export default Bookmarks;
