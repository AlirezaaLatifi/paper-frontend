import API from '.';

// get all books
async function getAllBooks() {
  try {
    const { data } = await API.get('/books');
    return { isSuccess: true, books: data.data.books };
  } catch (errorMessage) {
    return { isSuccess: false, message: errorMessage };
  }
}

// get a book
async function getBook(bookID) {
  try {
    const { data } = await API.get(`/books/${bookID}`);
    return { isSuccess: true, book: data };
  } catch (errorMessage) {
    return { isSuccess: false };
  }
}

// get searched books
async function getSearchBooks(searchParam) {
  try {
    const { data } = await API.get(`/books/search?title=${searchParam}`);
    return { isSuccess: true, book: data.book };
  } catch (errorMessage) {
    return { isSuccess: false };
  }
}

export { getAllBooks, getBook, getSearchBooks };
