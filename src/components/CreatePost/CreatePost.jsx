import { useEffect, useState } from "react";
import {
  getPostBookTranslation,
  getPostChapter,
} from "../services/apiCall.jsx";

export const CreatePost = (currentUser) => {
  const [posts, setPosts] = useState({});
  const [selectedBook, setSelectedBook] = useState("");
  const [chapterArray, setChapterArray] = useState([]);
  const [chapter, setChapter] = useState(1);
  const [verseArray, setVerseArray] = useState([]);
  const [verse, setVerse] = useState(1);
  const [bookAndChapter, setBookAndChapter] = useState({});
  const [createPosts, setCreatePosts] = useState({
    title: "",
    body: "",
    bibleBookId: 0,
    bibleVerseId: 0,
    userId: currentUser.id,
    likes: 0,
  });

  useEffect(() => {
    getPostBookTranslation().then(setPosts);
  }, []);

  useEffect(() => {
    getPostChapter(selectedBook.id, chapter).then(setBookAndChapter);
  }, [selectedBook, chapter]);

  useEffect(() => {
const verseArray = Array.from(
        { length: bookAndChapter?.numberOfVerses },
        (_, i) => i + 1
      );
      setVerseArray(verseArray);
  }, [bookAndChapter])

  const handleBookChange = (e) => {
    const bookId = e.target.value;
    const book = posts.books.find((book) => book.id === bookId);
    setSelectedBook(book);
    setCreatePosts({ ...createPosts, bibleBookId: bookId });

    if (book?.numberOfChapters) {
      const chapterArray = Array.from(
        { length: book.numberOfChapters },
        (_, i) => i + 1
      );
      setChapterArray(chapterArray);
    }
  };

  

  return (
    <>
      <form>
        <h2>Book</h2>
        <select
          onChange={(e) => {
            handleBookChange(e);
          }}
        >
          <option>Choose a Book</option>
          {posts.books?.map((book) => {
            return (
              <option value={book.id} key={book.id}>
                {book.name}
              </option>
            );
          })}
        </select>
        <h2>Chapter</h2>
        <select
          onChange={(e) => {
            const chapter = e.target.value;
            setChapter(parseInt(chapter));
          }}
        >
          <option>Choose a Chapter</option>
          {chapterArray.map((number) => {
            return (
              <option key={number} value={number}>
                {number}
              </option>
            );
          })}
        </select>

        <h2>Verse</h2>
        <select onChange={(e) => {
          const chosenVerse = e.target.value 
          setVerse(parseInt(chosenVerse))
        }}>
          <option>Select a Verse</option>
          {verseArray.map((number) => {
            return (
              <option key={number} value={number}>
                {number}
              </option>
            );
          })}
        </select>
      </form>
    </>
  );
};
