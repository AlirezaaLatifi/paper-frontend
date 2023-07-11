import API from '.';

export type Book = {
  id: number;
  shortDescription: string;
  longDescription: string;
  author: string;
  country: string;
  imageLink: string;
  language: string;
  lin: string;
  pages: number;
  title: string;
  year: number;
};

// get all books
async function getAllBooks() {
  try {
    const { data } = await API.get<Book[]>('/books');
    return data;
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

// get a book
async function getBook(bookID: number) {
  try {
    const { data } = await API.get<Book>(`/books/${bookID}`);
    return data;
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

// get searched books
async function getSearchBooks({ queryKey }: { queryKey: string[] }) {
  const [_key, searchParam] = queryKey;
  try {
    const { data } = await API.get<Book>(`/books/search?title=${searchParam}`);
    return data;
  } catch (errorMessage) {
    return Promise.reject(errorMessage as string);
  }
}

export { getAllBooks, getBook, getSearchBooks };
