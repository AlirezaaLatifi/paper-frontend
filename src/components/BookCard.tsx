import { BookOpenIcon } from '@heroicons/react/24/outline';
import { Book } from '../APIs/book';
type Props = {
  book: Book;
  onSelect: (bookId: number) => void;
  isSelected: boolean;
};
function BookCard({ book, onSelect, isSelected }: Props) {
  return (
    <div
      onClick={() => onSelect(book.id)}
      className={`p-4 ${
        isSelected ? 'border-2 border-teal-500' : 'border border-gray-300'
      } rounded-md flex gap-4 hover:cursor-pointer`}
    >
      <div className="grid place-items-center px-4 py-8 bg-gray-100 rounded-lg">
        <BookOpenIcon className="w-14 h-14 text-gray-300" />
      </div>
      <div className="py-2">
        <h2 className="font-bold text-lg">{book.title}</h2>
        <p className="font-thin text-gray-600">
          <span className="font-bold text-gray-600">Author: </span>
          {book.author}
        </p>
        <p className="mt-2 text-gray-600 font-thin">{book.shortDescription}</p>
      </div>
    </div>
  );
}

export default BookCard;
