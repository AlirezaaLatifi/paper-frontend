// import jwtDecode from 'jwt-decode';
// import { getAccessToken } from './user';

import API from '.';

// get all papers
async function getAllPapers() {
  try {
    const { data } = await API.get('/papers');
    return { papers: data.data.papers, isSuccess: true };
  } catch (err) {
    return { isSuccess: false };
  }
}

// get user papers
async function getUserPapers(token, userID) {
  const response = await fetch(`http://localhost:7575/papers/users/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resBodyObject = await response.json();
  return resBodyObject;
}

// delete paper
async function deletePaper(paperID) {
  try {
    await API.delete(`/papers/${paperID}`);
    return { isSuccess: true };
  } catch (err) {
    return { isSuccess: false, message: err.message };
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
  } catch (err) {
    return { isSuccess: false, message: err.message };
  }
}

export { getAllPapers, getUserPapers, deletePaper, addPaper };
