import { Paper } from '../APIs/paper';
import AddPaper from '../components/AddPaper';
import Feed from '../components/Feed';

export type HandlePapersFunc = (newPapers: Paper[]) => void;

function Home() {
  return (
    <>
      <AddPaper />
      <div className="my-8 border-b border-dashed border-gray-400" />
      <Feed />
    </>
  );
}

export default Home;
