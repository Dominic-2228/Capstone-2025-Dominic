import { useEffect, useState } from "react";
import {
  getPostBookTranslation,
  getPostChapter,
} from "../services/apiCall.jsx";
import Form from "react-bootstrap/Form";

export const Bible = () => {
  const [bibleBook, setBibleBook] = useState([]);
  const [chosenBook, setChosenBook] = useState("");
  const [bibleChapter, setBibleChapter] = useState(0);
  const [chapterArray, setChapterArray] = useState([]);
  const [selectedBookAndChapter, setSelectedBookAndChapter] = useState([]);

  useEffect(() => {
    getPostBookTranslation().then(setBibleBook);
  }, []);

  useEffect(() => {}, [bibleBook]);

  useEffect(() => {
    if (chosenBook && chosenBook) {
      getPostChapter(chosenBook.id, bibleChapter).then(
        setSelectedBookAndChapter
      );
    }
  }, [bibleChapter, chosenBook]);

  const handleBookChange = (e) => {
    const bookId = e.target.value;
    const book = bibleBook.books.find((book) => book.id === bookId);
    setChosenBook(book);

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
      <div>
        <h2>Book</h2>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            handleBookChange(e);
          }}
        >
          <option>Choose a Book</option>
          {bibleBook.books?.map((book) => {
            return (
              <option value={book.id} key={book.id}>
                {book.name}
              </option>
            );
          })}
        </Form.Select>
        <h2>Chapter</h2>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            const chapter = e.target.value;
            setBibleChapter(parseInt(chapter));
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

          {console.log(setSelectedBookAndChapter)}

          {console.log(selectedBookAndChapter)}
        </Form.Select>
        <div className="bible-reading">
        {selectedBookAndChapter.book?.name}
        {selectedBookAndChapter.chapter?.content
          ?.filter((verse) => verse.hasOwnProperty("number"))
          .map((verse) => (
            <p>
              <strong>{verse.number}</strong>
              {verse.content
                .map((part, index) =>
                  typeof part === "string" ? part : part.text || ""
                )
                .join("")}
            </p>
          ))}
          </div>
      </div>
    </>
  );
};
