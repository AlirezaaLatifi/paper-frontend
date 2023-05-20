import { BookOpenIcon, DocumentMinusIcon } from '@heroicons/react/24/outline';
import PaperActionBar from '../PaperActionBar';
import { useAuthState } from '../../contexts/auth';
import { deletePaper, getAllPapers } from '../../APIs/paper';

function CutPaper({ paper, onPapersUpdate }) {
  const auth = useAuthState();
  const handleDeletePaper = () => {
    deletePaper(paper.id).then(() => {
      getAllPapers().then((res) => {
        if (res.isSuccess) {
          onPapersUpdate(res.papers);
        }
      });
    });
  };
  return (
    <div className="flex flex-col gap-4 border border-gray-300 bg-white p-4">
      <div className="flex gap-4">
        <img
          className="h-10 w-10 items-start rounded-full"
          src={
            import.meta.env.PROD ? '/paper-frontend/avatar.jpeg' : 'avatar.jpeg'
          }
          alt="user avatar"
        />
        <div className="flex w-full flex-col">
          <div className="mb-2 flex items-center">
            <h6 className="text-sm">{paper.user}</h6>
            <span className="text-sm text-gray-400 ml-3">
              {paper.createdDate}
            </span>
            {auth.username === paper.user && (
              <DocumentMinusIcon
                className="ml-auto h-6 w-6 cursor-pointer text-gray-500 hover:text-red-500"
                onClick={handleDeletePaper}
              />
            )}
          </div>
          <p className="bg-gray-50 px-4 py-2 font-book">{paper.qoute}</p>
          <a
            href="#"
            className="mt-2 flex w-max gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm text-sky-900 hover:bg-sky-100"
          >
            <BookOpenIcon className="h-5 w-5" />
            {paper.bookTitle}
          </a>
          <div className="my-4 border border-dashed border-gray-400" />
          <p className="rounded-xl bg-gray-50 px-4 py-2 font-handwrite">
            {paper.text}
          </p>
        </div>
      </div>
      <PaperActionBar paperID={paper.id} />
    </div>
  );
}

export default CutPaper;
