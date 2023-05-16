import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { addPaper, getAllPapers } from '../../APIs/paper';
import { useAuthState } from '../../contexts/auth';

function AddWhitePaper({ onPapersUpdate }) {
  const [text, setText] = useState('');
  const auth = useAuthState();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddPaper = async () => {
    addPaper('white', text, auth.username).then(() => {
      getAllPapers().then((res) => {
        if (res.isSuccess) {
          onPapersUpdate(res.papers);
        }
      });
    });
    setText('');
  };

  return (
    <>
      <textarea
        value={text}
        onChange={handleTextChange}
        className="mt-4 w-full resize-none rounded-xl border border-gray-300 bg-gray-50 p-2 font-handwrite focus:border focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
      />
      <button
        type="button"
        className="mx-auto mt-4 flex gap-2 rounded-lg bg-teal-600 px-4 py-2 text-teal-50 hover:bg-teal-700"
        onClick={handleAddPaper}
      >
        <PaperAirplaneIcon className="h-5 w-5" />
        <span>Fly</span>
      </button>
    </>
  );
}

export default AddWhitePaper;
