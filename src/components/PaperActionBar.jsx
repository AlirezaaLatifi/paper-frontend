import { BookmarkIcon } from '@heroicons/react/24/outline';

function PaperActionBar() {
  return (
    <div className="group flex justify-around rounded-md bg-stone-100 py-2 hover:bg-gray-200 cursor-pointer ">
      <BookmarkIcon className="h-5 w-5 cursor-pointer text-gray-400 group-hover:text-gray-700" />
    </div>
  );
}

export default PaperActionBar;
