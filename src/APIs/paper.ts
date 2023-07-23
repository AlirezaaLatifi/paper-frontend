import API from '.';

export type WhitePaperType = {
  id: number;
  user: string;
  userID: number;
  type: 'white';
  text: string;
  createdDate: string;
};

export type CutPaperType = {
  id: number;
  userID: number;
  type: 'cut';
  text: string;
  createdDate: string;
  user: string;
  bookID: number;
  bookTitle: string;
  qoute: string;
};

export type Paper = WhitePaperType | CutPaperType;
export type GetPapersReturnType = {
  total: number;
  page: number;
  pageSize: number;
  data: Paper[];
  nextPage: number;
  hasNextPage: boolean;
};

// get all papers
async function getAllPapers({ pageParam = 1 }) {
  try {
    const { data } = await API.get<GetPapersReturnType>(
      `/papers?page=${pageParam}&pageSize=5`
    );
    return data;
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
async function addPaper({
  paperData,
  username,
}: {
  paperData: PaperData;
  username: string;
}) {
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
