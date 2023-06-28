import { useEffect, useState } from 'react';
import { Paper, getAllPapers } from '../APIs/paper';
import AddPaper from '../components/AddPaper';
import Feed from '../components/Feed';
import { useAuthState } from '../contexts/auth';

export type HandlePapersFunc = (newPapers: Paper[]) => void;

function Home() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const auth = useAuthState();
  const handlePapers: HandlePapersFunc = (newPapers: Paper[]) => {
    setPapers(newPapers);
  };

  // TODO
  useEffect(() => {
    getAllPapers().then((papers) => {
      setPapers(papers);
    });
  }, [auth.token]);

  return (
    <>
      <AddPaper onPapersUpdate={handlePapers} />
      <div className="my-8 border-b border-dashed border-gray-400" />
      <Feed onPapersUpdate={handlePapers} papers={papers} />
    </>
  );
}

export default Home;
