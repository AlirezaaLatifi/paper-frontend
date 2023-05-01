import { useEffect, useState } from 'react';
import { getAllPapers } from '../APIs/paper';
import AddPaper from '../components/AddPaper/AddPaper';
import Feed from '../components/Feed';
import { useAuth } from '../contexts/auth';

function Home() {
  const [papers, setPapers] = useState(null);
  const { auth } = useAuth();
  const handlePapers = (newPapers) => {
    setPapers(newPapers);
  };

  useEffect(() => {
    getAllPapers().then((res) => {
      if (res.isSuccess) {
        setPapers(res.papers);
      }
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
