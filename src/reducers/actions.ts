type cutPaperAction1 = {
  type: 'changeQoute' | 'changeText';
  payload: { text: string };
};

type cutPaperAction2 = {
  type: 'selectBook';
  payload: {
    bookId: number;
    bookTitle: string;
  };
};

type cutPaperAction3 = {
  type: 'unselectBook' | 'reset';
};

export type cutPaperAction =
  | cutPaperAction1
  | cutPaperAction2
  | cutPaperAction3;
