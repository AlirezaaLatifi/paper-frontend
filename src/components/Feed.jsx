import CutPaper from './Papers/CutPaper';
import WhitePaper from './Papers/WhitePaper';

function Feed({ papers, onPapersUpdate }) {
  if (!papers)
    return <p className="py-4 text-center uppercase">... loading ...</p>;

  return (
    <div>
      <div className="flex flex-col gap-4">
        {papers.length ? (
          papers.map((paper) => {
            if (paper.type === 'white') {
              return (
                <WhitePaper
                  onPapersUpdate={onPapersUpdate}
                  key={paper.id}
                  paper={paper}
                />
              );
            }
            if (paper.type === 'cut') {
              return (
                <CutPaper
                  onPapersUpdate={onPapersUpdate}
                  key={paper.id}
                  paper={paper}
                />
              );
            }
            return '';
          })
        ) : (
          <p className="py-4 text-center uppercase">
            ... There is no paper yet ...
          </p>
        )}
      </div>
    </div>
  );
}

export default Feed;
