import { Paper } from '../APIs/paper';
import { HandlePapersFunc } from '../pages/Home';
import CutPaper from './CutPaper';
import WhitePaper from './WhitePaper';

type Props = {
  papers: Paper[];
  onPapersUpdate: HandlePapersFunc;
};

function Feed({ papers, onPapersUpdate }: Props) {
  if (!papers)
    return <p className="py-4 text-center uppercase">... loading ...</p>;

  return (
    <div className="flex flex-col gap-4 md:max-w-screen-sm md:mx-auto">
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
  );
}

export default Feed;
