import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Book, getSearchBooks } from '../APIs/book';
import { HandleBookId, HandleBookTitle } from './AddCutPaper';

type Props = {
  onClose: () => void;
  onBookTitle: HandleBookTitle;
  onBookId: HandleBookId;
};

function SelectBookModal({ onClose, onBookTitle, onBookId }: Props) {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [foundBook, setFoundBook] = useState<Book | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  const handleSearch = () => {
    getSearchBooks(searchInputValue)
      .then((book) => {
        setFoundBook(book);
        setErrorMessage('');
        setIsSelected(false);
      })
      .catch((errorMessage) => {
        setFoundBook(null);
        setErrorMessage(errorMessage);
        setIsSelected(false);
      });
  };

  const onKeyPressHandler = () => {};

  const handleSubmit = () => {
    if (foundBook) {
      onBookTitle(foundBook.title);
      onBookId(foundBook.id);
      onClose();
    }
  };

  return createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.7)] z-[1000]"
      onClick={onClose}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 bg-gray-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 min-h-[250px]"
      >
        <div className="flex justify-between p-2">
          <h2 className="text-xl">Attach The Book</h2>
          <button type="button" onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-red-600" />
          </button>
        </div>
        <div className="w-1/2 mx-auto flex mb-6">
          <input
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            className="p-4 rounded-lg focus:outline-none border border-gray-500 w-full"
            type="text"
            name="bookname"
            placeholder="e.g. things fall apart, the book of job"
          />
          <button
            type="button"
            className="p-4 bg-blue-600 -ml-4 rounded-r-md hover:bg-blue-800"
            onClick={handleSearch}
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 mx-auto bg-gray-200 rounded">
          {Boolean(errorMessage) && (
            <p className="text-center p-4 bg-white">{errorMessage}</p>
          )}
          {foundBook ? (
            <div
              className={`bg-white p-4 flex rounded-lg cursor-pointer border-4 border-gray-300 ${
                isSelected ? 'border-green-500' : ''
              }`}
              onClick={() => setIsSelected(!isSelected)}
              // eslint-disable-next-line no-undef
              onKeyDown={onKeyPressHandler}
              role="button"
              tabIndex={0}
            >
              <div className="bg-gray-800 text-white grid place-items-center w-[100px] h-[100px] rounded-lg self-center">
                <BookOpenIcon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="font-bold">{foundBook.title}</h2>
                <p>
                  Author:{' '}
                  <span className="text-gray-700">{foundBook.author}</span>
                </p>
                <p className="text-gray-700 font-thin">
                  {foundBook.shortDescription}
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <button
          disabled={!isSelected}
          onClick={handleSubmit}
          className={`py-2 px-4 rounded mx-auto block mt-8 ${
            !isSelected
              ? 'bg-gray-400 text-gray-500 hover:cursor-not-allowed'
              : 'bg-teal-600 text-white hover:bg-teal-800'
          }`}
          type="button"
        >
          Submit
        </button>
      </div>
    </div>,
    document.getElementById('portal')!
  );
}

export default SelectBookModal;