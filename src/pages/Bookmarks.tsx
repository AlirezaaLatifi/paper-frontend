import { useEffect, useState } from 'react';
import { Paper, getAllPapers } from '../APIs/paper';
import WhitePaper from '../components/WhitePaper';
import CutPaper from '../components/CutPaper';

function Bookmarks() {
  const [renderState, setRenderState] = useState(false);
  const [bookmarkedPaperIDs, setBookmarkedPaperIDs] = useState<number[]>([]);
  const [bookmarkedPapers, setBookmarkedPapers] = useState<Paper[]>([]);

  const onBookmark = () => {
    setRenderState((pre) => !pre);
  };

  useEffect(() => {
    const bookmarks = localStorage.getItem('bookmarks');
    setBookmarkedPaperIDs(bookmarks ? JSON.parse(bookmarks) : []);
  }, [renderState]);

  useEffect(() => {
    getAllPapers().then((papers) => {
      setBookmarkedPapers(
        papers.filter((paper) => bookmarkedPaperIDs.includes(paper.id))
      );
    });
  }, [bookmarkedPaperIDs]);

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
