import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { WhitePaperData, addPaper } from '../APIs/paper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthState } from '../contexts/auth';

function AddWhitePaper() {
  const auth = useAuthState();

  const [paperData, setPaperData] = useState<WhitePaperData>({
    text: '',
    paperType: 'white',
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addPaper,
    onSuccess: () => {
      queryClient.invalidateQueries(['papers']);
    },
  });

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setPaperData({ ...paperData, text: e.target.value });
  };

  const handleAddPaper: MouseEventHandler<HTMLButtonElement> = async () => {
    mutation.mutate({ paperData, username: auth.username });
    setPaperData({
      ...paperData,
      text: '',
    });
  };

  return (
    <>
      <textarea
        placeholder="what's on your mind?"
        value={paperData.text}
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
