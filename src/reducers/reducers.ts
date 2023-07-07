import { CutPaperData } from '../APIs/paper';
import { initialCutPaperState } from '../components/AddCutPaper';
import { cutPaperAction } from './actions';

export function cutPaperReducer(draft: CutPaperData, action: cutPaperAction) {
  if (action.type === 'changeText') {
    draft.text = action.payload.text;
  }

  if (action.type === 'changeQoute') {
    draft.qoute = action.payload.text;
  }

  if (action.type === 'selectBook') {
    draft.bookId = action.payload.bookId;
    draft.bookTitle = action.payload.bookTitle;
  }

  if (action.type === 'unselectBook') {
    draft.bookId = null;
    draft.bookTitle = '';
  }

  if (action.type === 'reset') {
    draft = initialCutPaperState;
  }

  return draft;
}
