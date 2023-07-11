import {
  BookOpenIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { PaperClipIcon } from '@heroicons/react/24/solid';
import { ChangeEventHandler, useState } from 'react';
import { CutPaperData, addPaper } from '../APIs/paper';
import SelectBookModal from './SelectBookModal';
import { cutPaperReducer } from '../reducers/reducers';
import { useImmerReducer } from 'use-immer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthState } from '../contexts/auth';

export const initialCutPaperState: CutPaperData = {
  text: '',
  qoute: '',
  bookTitle: '',
  bookId: null,
  paperType: 'cut',
};

function AddCutPaper() {
  const auth = useAuthState();
  const [paperData, dispatchPaper] = useImmerReducer(
    cutPaperReducer,
    initialCutPaperState
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addPaper,
    onSuccess: () => {
      queryClient.invalidateQueries(['papers']);
    },
  });

  const handleQoute: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    dispatchPaper({
      type: 'changeQoute',
      payload: {
        text: e.target.value,
      },
    });
  };
  const handleText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    dispatchPaper({
      type: 'changeText',
      payload: {
        text: e.target.value,
      },
    });
  };
  const handleSelectBook = (id: number, title: string) => {
    dispatchPaper({
      type: 'selectBook',
      payload: {
        bookId: id,
        bookTitle: title,
      },
    });
  };
  const handleUnselectBook = () => {
    dispatchPaper({ type: 'unselectBook' });
  };

  const handleAddPaper = async () => {
    mutation.mutate({ paperData, username: auth.username });
    dispatchPaper({ type: 'reset' });
  };

  return (
    <>
      <div>
        {paperData.bookTitle ? (
          <button
            type="button"
            className="group mr-2 mt-4 inline-flex items-center rounded-lg bg-teal-50 py-2 px-4 text-teal-800 hover:bg-teal-100"
            onClick={handleUnselectBook}
          >
            <BookOpenIcon className="h-5 w-5" />
            <span className="ml-2">{paperData.bookTitle}</span>
            <XMarkIcon className="ml-2 w-4 h-4 hidden group-hover:inline group-hover:text-red-500" />
          </button>
        ) : (
          <button
            type="button"
            className="mr-2 mt-4 inline-flex items-center rounded-lg bg-teal-50 py-2 px-4 text-teal-800 hover:bg-teal-100"
            onClick={() => {
              document.body.style.overflow = 'hidden';
              setIsModalOpen(true);
            }}
          >
            <PaperClipIcon className="h-5 w-5" />
            <span className="ml-2">Attach Book</span>
          </button>
        )}
        {isModalOpen && (
          <SelectBookModal
            onBookSelect={handleSelectBook}
            onClose={() => {
              document.body.style.overflow = 'scroll';
              setIsModalOpen(false);
            }}
          />
        )}
        <div className="relative">
          <svg
            className="absolute -top-2 right-4 h-4 w-4"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="512.000000pt"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#0D9488"
              stroke="none"
            >
              <path
                d="M1080 4235 c-552 -104 -943 -597 -916 -1155 13 -273 117 -516 307
-714 140 -147 302 -246 486 -299 46 -13 85 -26 88 -29 9 -9 -49 -140 -111
-252 -81 -145 -169 -273 -298 -436 -98 -122 -117 -152 -128 -198 -23 -103 26
-204 121 -254 76 -40 131 -38 275 12 733 253 1231 784 1415 1511 61 242 75
358 76 624 0 185 -3 244 -17 302 -106 432 -408 757 -810 869 -78 22 -119 26
-253 30 -111 2 -183 -1 -235 -11z"
              />
              <path
                d="M3611 4229 c-367 -77 -675 -333 -811 -673 -64 -160 -74 -213 -74
-421 -1 -178 1 -196 27 -289 107 -384 412 -691 780 -786 59 -15 71 -21 69 -37
-2 -10 -32 -77 -68 -149 -80 -162 -213 -365 -340 -520 -110 -134 -133 -178
-134 -252 0 -65 17 -108 65 -160 81 -91 173 -93 390 -12 910 339 1438 1120
1439 2130 0 208 -8 264 -59 416 -131 390 -463 684 -858 759 -113 21 -308 19
-426 -6z"
              />
            </g>
          </svg>
          <textarea
            onChange={handleQoute}
            value={paperData.qoute}
            className="mt-4 block w-full resize-none border border-gray-300 bg-gray-50 p-2 font-book outline-none focus:border focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
            placeholder="Passage from the book ..."
          />
          <svg
            className="absolute -bottom-2 left-4 z-30 h-4 w-4"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="512.000000pt"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#0D9488"
              stroke="none"
            >
              <path
                d="M1080 4235 c-552 -104 -943 -597 -916 -1155 13 -273 117 -516 307
-714 140 -147 302 -246 486 -299 46 -13 85 -26 88 -29 9 -9 -49 -140 -111
-252 -81 -145 -169 -273 -298 -436 -98 -122 -117 -152 -128 -198 -23 -103 26
-204 121 -254 76 -40 131 -38 275 12 733 253 1231 784 1415 1511 61 242 75
358 76 624 0 185 -3 244 -17 302 -106 432 -408 757 -810 869 -78 22 -119 26
-253 30 -111 2 -183 -1 -235 -11z"
              />
              <path
                d="M3611 4229 c-367 -77 -675 -333 -811 -673 -64 -160 -74 -213 -74
-421 -1 -178 1 -196 27 -289 107 -384 412 -691 780 -786 59 -15 71 -21 69 -37
-2 -10 -32 -77 -68 -149 -80 -162 -213 -365 -340 -520 -110 -134 -133 -178
-134 -252 0 -65 17 -108 65 -160 81 -91 173 -93 390 -12 910 339 1438 1120
1439 2130 0 208 -8 264 -59 416 -131 390 -463 684 -858 759 -113 21 -308 19
-426 -6z"
              />
            </g>
          </svg>
        </div>
        <textarea
          onChange={handleText}
          value={paperData.text}
          placeholder="Your feelings or thoughts ..."
          className="mt-4 w-full resize-none rounded-xl border border-gray-300 bg-gray-50 p-2 font-handwrite focus:border focus:border-teal-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
        />
      </div>
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

export default AddCutPaper;
