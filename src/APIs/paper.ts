import API from '.';

type Paper = {
  id: number;
  userID: number;
  type: string;
  text: string;
  createdDate: string;
  user: string;
};

// get all papers
async function getAllPapers() {
  try {
    const { data: papers } = await API.get<Paper[]>('/papers');
    return papers;
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

// get user papers
async function getUserPapers(userID: number) {
  try {
    const { data: userPapers } = await API.get<Paper[]>(
      `/papers/users/${userID}`
    );
    return userPapers;
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

// delete paper
async function deletePaper(paperID: number) {
  try {
    await API.delete(`/papers/${paperID}`);
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

export type WhitePaperData = {
  paperType: 'white';
  text: string;
};

export type CutPaperData = {
  text: string;
  qoute: string;
  bookTitle: string;
  bookId: null | number;
  paperType: 'cut';
};

type PaperData = WhitePaperData | CutPaperData;

// add paper
async function addPaper(paperData: PaperData, username: string) {
  let reqBody;
  if (paperData.paperType === 'white') {
    reqBody = { username, text: paperData.text, type: paperData.paperType };
  } else {
    reqBody = {
      username,
      type: paperData.paperType,
      text: paperData.text,
      qoute: paperData.qoute,
      bookID: paperData.bookId,
      bookTitle: paperData.bookTitle,
    };
  }

  try {
    await API.post('/papers', reqBody, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

export { getAllPapers, getUserPapers, deletePaper, addPaper };
