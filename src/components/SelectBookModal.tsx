import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChangeEventHandler, useState } from 'react';
import { createPortal } from 'react-dom';
import { getAllBooks } from '../APIs/book';
import { useQuery } from '@tanstack/react-query';
import BookCard from './BookCard';

type Props = {
  onClose: () => void;
  onBookSelect: (id: number, title: string) => void;
};

function SelectBookModal({ onClose, onBookSelect }: Props) {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const {
    data: books,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
    staleTime: Infinity,
  });

  const foundBooks = books?.filter((book) =>
    searchInputValue
      ? book.title.toLocaleLowerCase().includes(searchInputValue)
      : false
  );

  const handleSelectedBook = (bookId: number) => {
    setSelectedBookId(bookId);
  };

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInputValue(e.target.value);
    setSelectedBookId(null);
  };

  const handleSubmit = () => {
    const title = foundBooks?.find((book) => book.id === selectedBookId)?.title;
    // how to type narrow correctly, in a way to not need to use ! mark ??
    onBookSelect(selectedBookId!, title!);
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
            disabled={isLoading}
            value={searchInputValue}
            onChange={handleSearchInput}
            className={`p-4 rounded-lg focus:outline-none border ${
              isLoading ? 'border-gray-200' : 'border-gray-600'
            } w-full`}
            type="text"
            name="bookname"
            placeholder="e.g. things fall apart, the book of job"
          />
        </div>

        {isError ? (
          <div className="bg-white py-4 text-center rounded-lg">{`${error}`}</div>
        ) : null}

        {foundBooks ? (
          <div className="grid gap-4 bg-white p-4 max-h-[50vh] overflow-scroll">
            {foundBooks.map((book) => (
              <BookCard
                isSelected={book.id === selectedBookId}
                key={book.id}
                book={book}
                onSelect={handleSelectedBook}
              />
            ))}
          </div>
        ) : null}

        <button
          disabled={!selectedBookId}
          onClick={handleSubmit}
          className={`py-2 px-4 rounded mx-auto block my-12 ${
            !selectedBookId
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
