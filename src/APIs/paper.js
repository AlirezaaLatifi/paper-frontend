import API from '.';

// get all papers
async function getAllPapers() {
  try {
    const { data } = await API.get('/papers');
    return { papers: data.data.papers, isSuccess: true };
  } catch (errorMessage) {
    return { isSuccess: false };
  }
}

// get user papers
async function getUserPapers(userID) {
  try {
    const { data } = await API.get(`/papers/users/${userID}`);
    return { isSuccess: true, papers: data.data.papers };
  } catch (errorMessage) {
    return { isSuccess: false };
  }
}

// delete paper
async function deletePaper(paperID) {
  try {
    await API.delete(`/papers/${paperID}`);
    return { isSuccess: true };
  } catch (errorMessage) {
    return { isSuccess: false, message: errorMessage };
  }
}

// add paper
async function addPaper(type, paperData, username) {
  let reqBody;
  if (type === 'white') {
    reqBody = { username, text: paperData, type };
  } else {
    reqBody = {
      username,
      type,
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
    return { isSuccess: true };
  } catch (errorMessage) {
    return { isSuccess: false, message: errorMessage };
  }
}

export { getAllPapers, getUserPapers, deletePaper, addPaper };
