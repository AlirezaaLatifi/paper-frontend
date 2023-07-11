import { useQuery } from '@tanstack/react-query';
import CutPaper from './CutPaper';
import WhitePaper from './WhitePaper';
import { getAllPapers } from '../APIs/paper';

function Feed() {
  const {
    data: papers,
    isLoading,
    isError,
  } = useQuery(['papers'], getAllPapers);

  if (isLoading)
    return <p className="py-4 text-center uppercase">... loading ...</p>;

  if (isError)
    return (
      <p className="py-4 text-center uppercase">... Something went wrong ...</p>
    );

  return (
    <div className="flex flex-col gap-4 md:max-w-screen-sm md:mx-auto">
      {papers.length ? (
        papers.map((paper) => {
          if (paper.type === 'white') {
            return <WhitePaper key={paper.id} paper={paper} />;
          }
          if (paper.type === 'cut') {
            return <CutPaper key={paper.id} paper={paper} />;
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
