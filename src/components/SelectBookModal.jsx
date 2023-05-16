import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { getSearchBooks } from '../APIs/book';

function SelectBookModal({ onClose, onBookTitle, onBookId }) {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [foundBook, setFoundBook] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  const handleSearch = () => {
    getSearchBooks(searchInputValue).then((res) => {
      if (res.isSuccess) {
        setFoundBook(res.book);
        setErrorMessage('');
        setIsSelected(false);
      } else {
        setFoundBook(null);
        setErrorMessage('book not found.');
        setIsSelected(false);
      }
    });
  };

  const onKeyPressHandler = () => {};

  const handleSubmit = () => {
    onBookTitle(foundBook.title);
    onBookId(foundBook.id);
    onClose();
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
        className="p-4 bg-gray-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 min-h-[250px]"
      >
        <div className="flex justify-between mb-6">
          <h2 className="text-xl"> &gt;&gt; Attach Book</h2>
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
            placeholder="Search book by full name"
          />
          <button
            type="button"
            className="p-4 bg-blue-600 -ml-4 rounded-r-md hover:bg-blue-800"
            onClick={handleSearch}
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        {foundBook || errorMessage ? (
          <div className="p-4 mx-auto bg-stone-200">
            {errorMessage ? (
              <p className="text-center p-4 bg-white">{errorMessage}</p>
            ) : (
              <div
                className={`bg-white p-4 flex rounded-lg cursor-pointer border-4 border-gray-300 ${
                  isSelected ? 'border-green-500' : ''
                }`}
                onClick={() => setIsSelected(!isSelected)}
                // eslint-disable-next-line no-undef
                onKeyDown={onKeyPressHandler}
                role="button"
                tabIndex="0"
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
            )}
          </div>
        ) : null}
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
    document.getElementById('portal')
  );
}

export default SelectBookModal;
