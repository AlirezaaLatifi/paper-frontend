import { CutPaperData } from '../APIs/paper';
import { initialCutPaperState } from '../components/AddCutPaper';
import { cutPaperAction } from './actions';

export function cutPaperReducer(state: CutPaperData, action: cutPaperAction) {
  if (action.type === 'changeText') {
    return { ...state, text: action.payload.text };
  }

  if (action.type === 'changeQoute') {
    return { ...state, qoute: action.payload.text };
  }

  if (action.type === 'selectBook') {
    return {
      ...state,
      bookId: action.payload.bookId,
      bookTitle: action.payload.bookTitle,
    };
  }

  if (action.type === 'unselectBook') {
    return {
      ...state,
      bookId: null,
      bookTitle: '',
    };
  }

  if (action.type === 'reset') {
    return initialCutPaperState;
  }

  return state;
}
