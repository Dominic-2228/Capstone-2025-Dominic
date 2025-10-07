import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { createCustomPost } from "../services/AllPostServices.jsx";
import { useEffect, useState } from "react";
import {
  getPostBookTranslation,
  getPostChapter,
} from "../services/apiCall.jsx";

export const CreatePost = ({ currentUser }) => {
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
    bibleBookId: "",
    bibleChapterId: 0,
    bibleVerseId: 0,
    likes: 0,
    date: new Date(),
  });

  const navigate = useNavigate();

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
  }, [bookAndChapter]);

  useEffect(() => {
    if (currentUser?.id) {
      const copy = { ...createPosts };
      copy.user = currentUser.id;
      setCreatePosts(copy);
    }
  }, [currentUser]);

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

  const handleSave = (e) => {
    e.preventDefault();

    if (
      createPosts.title &&
      createPosts.body &&
      createPosts.bibleBookId &&
      createPosts.bibleChapterId &&
      createPosts.bibleVerseId &&
      createPosts.user
    ) {
      createCustomPost(createPosts).then(() => {
        navigate(`/myposts`);
      });
    }
  };

  return (
  <>
    <div className="createUpdatepost-container">
      <form className="form-container">
        <h2>Book</h2>
        <Form.Select
          aria-label="Select a Bible book"
          onChange={(e) => {
            handleBookChange(e);
            const copy = { ...createPosts };
            copy.bibleBookId = e.target.value;
            setCreatePosts(copy);
          }}
        >
          <option value="">Choose a Book</option>
          {posts.books?.map((book) => (
            <option value={book.id} key={book.id}>
              {book.name}
            </option>
          ))}
        </Form.Select>

        <h2>Chapter</h2>
        <Form.Select
          aria-label="Select a chapter"
          onChange={(e) => {
            const chapter = e.target.value;
            setChapter(parseInt(chapter));
            const copy = { ...createPosts };
            copy.bibleChapterId = parseInt(chapter);
            setCreatePosts(copy);
          }}
        >
          <option value="">Choose a Chapter</option>
          {chapterArray.map((number) => (
            <option key={number} value={number}>
              Chapter {number}
            </option>
          ))}
        </Form.Select>

        <h2>Verse</h2>
        <Form.Select
          aria-label="Select a verse"
          onChange={(e) => {
            const chosenVerse = e.target.value;
            setVerse(parseInt(chosenVerse));
            const copy = { ...createPosts };
            copy.bibleVerseId = parseInt(chosenVerse);
            setCreatePosts(copy);
          }}
        >
          <option value="">Select a Verse</option>
          {verseArray.map((number) => (
            <option key={number} value={number}>
              Verse {number}
            </option>
          ))}
        </Form.Select>

        <h2>Title</h2>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Enter a meaningful title for your post"
          onChange={(e) => {
            const chosenTitle = e.target.value;
            const copy = { ...createPosts };
            copy.title = chosenTitle;
            setCreatePosts(copy);
          }}
        />

        <h2>Description</h2>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Share your thoughts and reflections"
          onChange={(e) => {
            const chosenDesc = e.target.value;
            const copy = { ...createPosts };
            copy.body = chosenDesc;
            setCreatePosts(copy);
          }}
        />
      </form>

      <Button variant="primary" onClick={handleSave}>
        Create Post
        <div className="button-icon-edit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </Button>
    </div>
  </>
);
};
