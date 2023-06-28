import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type Props = {
  paperID: number;
  onBookmark: () => void;
};

function PaperActionBar({ paperID, onBookmark }: Props) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    const bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks).includes(paperID) : false;
  });

  const handleBookmark = () => {
    if (isBookmarked) {
      const bookmarks: number[] = JSON.parse(
        localStorage.getItem('bookmarks') as string
      );
      const updatedBookmarks: number[] = bookmarks.filter(
        (bookmarkedPaperID) => bookmarkedPaperID !== paperID
      );
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      onBookmark();
    } else {
      const prevBookmarks = localStorage.getItem('bookmarks');
      if (prevBookmarks) {
        const updatedBookmarks = [...JSON.parse(prevBookmarks), paperID];
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      } else {
        localStorage.setItem('bookmarks', JSON.stringify([paperID]));
      }
      setIsBookmarked(true);
      onBookmark();
    }
  };

  return (
    <button
      type="button"
      className="group flex justify-around rounded-md bg-stone-100 py-2 hover:bg-gray-200 cursor-pointer "
      onClick={handleBookmark}
    >
      {isBookmarked ? (
        <BookmarkIconSolid />
      ) : (
        <BookmarkIcon className="h-5 w-5 cursor-pointer text-gray-400 group-hover:text-gray-700" />
      )}
    </button>
  );
}

function BookmarkIconSolid() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 cursor-pointer text-black group-hover:text-gray-800"
    >
      <path
        fillRule="evenodd"
        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default PaperActionBar;
