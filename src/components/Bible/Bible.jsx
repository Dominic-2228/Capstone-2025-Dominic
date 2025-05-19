import { useEffect, useState } from "react"
import { getPostBookTranslation, getPostChapter } from "../services/apiCall.jsx"

export const Bible = () => {
  const [bibleBook, setBibleBook] = useState([])
  const [bibleChapter, setBibleChapter] = useState([])
  const [chapterArray, setChapterArray] = useState([])
  const [selectedBookAndChapter,setSelectedBookAndChapter] = useState([])


  useEffect(() => {
    getPostBookTranslation().then(setBibleBook)
  },[])

  useEffect(() => {
    
  }, [bibleBook])

  useEffect(() => {
    getPostChapter(bibleBook, bibleChapter).then(setSelectedBookAndChapter)
  }, [])


    const handleBookChange = (e) => {
    const bookId = e.target.value;
    const book = bibleBook.books.find((book) => book.id === bookId);
    setBibleBook(book);

    if (book?.numberOfChapters) {
      const chapterArray = Array.from(
        { length: book.numberOfChapters },
        (_, i) => i + 1
      );
      setChapterArray(chapterArray);
    }
  };
  
  return (<>

          <h2>Book</h2>
        <Form.Select aria-label="Default select example"
          onChange={(e) => {
            handleBookChange(e);
          }}
        >
          <option>Choose a Book</option>
          {selectedBookAndChapter.books?.map((book) => {
            return (
              <option value={book.id} key={book.id}>
                {book.name}
              </option>
            );
          })}
        </Form.Select>
        <h2>Chapter</h2>
        <Form.Select aria-label="Default select example"
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
        </Form.Select>

  {bibleChapter.map((book) => {

  })}
  
  </>)
}