import { ChangeEventHandler, useState } from 'react';
import AddCutPaper from './AddCutPaper';
import AddWhitePaper from './AddWhitePaper';
import { HandlePapersFunc } from '../pages/Home';

type Props = {
  onPapersUpdate: HandlePapersFunc;
};

function AddPaper({ onPapersUpdate }: Props) {
  const [paperType, setPaperType] = useState('cut');

  const handlePaperType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setPaperType(e.target.value);
  };

  return (
    <div className=" border border-gray-300 bg-white p-4 dark:bg-gray-700 md:mx-auto md:max-w-screen-sm md:p-8">
      <select
        className="block w-full cursor-pointer border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500 md:w-1/4"
        defaultValue={paperType}
        onChange={handlePaperType}
      >
        <option value="white">White Paper</option>
        <option value="cut">Cut Paper</option>
      </select>
      {paperType === 'white' ? (
        <AddWhitePaper onPapersUpdate={onPapersUpdate} />
      ) : (
        <AddCutPaper onPapersUpdate={onPapersUpdate} />
      )}
    </div>
  );
}

export default AddPaper;
