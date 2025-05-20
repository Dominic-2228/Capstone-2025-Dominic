import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPostBookTranslation,
  getPostChapter,
} from "../services/apiCall.jsx";
import { createUpdatePost, deletePost } from "../services/AllPostServices.jsx";
import { getUserById } from "../services/userService.jsx";
import { Button } from "react-bootstrap";

export const EditPost = ({ currentUser }) => {
  const { postId } = useParams();
  const [posts, setPosts] = useState({});
  const [selectedBook, setSelectedBook] = useState("");
  const [chapterArray, setChapterArray] = useState([]);
  const [chapter, setChapter] = useState(1);
  const [verseArray, setVerseArray] = useState([]);
  const [verse, setVerse] = useState(1);
  const [bookAndChapter, setBookAndChapter] = useState({});
  const [postById, setPostById] = useState([]);
  const [updatePosts, setUpdatePosts] = useState({
    title: "",
    body: "",
    bibleBookId: "",
    bibleChapterId: 0,
    bibleVerseId: 0,
    userId: 0,
    likes: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getPostBookTranslation().then(setPosts);
  }, []);

  useEffect(() => {
    getUserById(postId).then((data) => {
      const postObj = data[0];
      setPostById(postObj);
    });
  }, [postId]);
  console.log(postById);

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
      const copy = { ...updatePosts };
      copy.userId = currentUser.id;
      setUpdatePosts(copy);
    }
  }, [currentUser]);

  useEffect(() => {
    setUpdatePosts(postById);
  }, [postById]);

  const handleBookChange = (e) => {
    const bookId = e.target.value;
    const book = posts.books.find((book) => book.id === bookId);
    setSelectedBook(book);
    setUpdatePosts({ ...updatePosts, bibleBookId: bookId });

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
      updatePosts.title &&
      updatePosts.body &&
      updatePosts.bibleBookId &&
      updatePosts.bibleChapterId &&
      updatePosts.bibleVerseId &&
      updatePosts.userId
    ) {
      createUpdatePost(updatePosts, postId).then(() => {
        navigate(`/myposts`);
      });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    deletePost(postId).then(() => {
      navigate(`/myposts`);
    });
  };

  return (
    <>
      <div className="createUpdatepost-container">
      <h2>Update Post</h2>
        <form className="form-container">
          <h2>Book</h2>
          <Form.Select
            onChange={(e) => {
              handleBookChange(e);
              const copy = { ...updatePosts };
              copy.bibleBookId = e.target.value;
              setUpdatePosts(copy);
            }}
          >
            <option>{postById.bibleBookId}</option>
            {posts.books?.map((book) => {
              return (
                <option
                  placeholder={postById.bibleBookId}
                  value={book.id}
                  key={book.id}
                >
                  {book.name}
                </option>
              );
            })}
          </Form.Select>
          <h2>Chapter</h2>
          <Form.Select
            onChange={(e) => {
              const chapter = e.target.value;
              setChapter(parseInt(chapter));
              const copy = { ...updatePosts };
              copy.bibleChapterId = parseInt(chapter);
              setUpdatePosts(copy);
            }}
          >
            <option>{postById.bibleChapterId}</option>
            {chapterArray.map((number) => {
              return (
                <option key={number} value={number}>
                  {number}
                </option>
              );
            })}
          </Form.Select>

          <h2>Verse</h2>
          <Form.Select
            onChange={(e) => {
              const chosenVerse = e.target.value;
              setVerse(parseInt(chosenVerse));
              const copy = { ...updatePosts };
              copy.bibleVerseId = parseInt(chosenVerse);
              setUpdatePosts(copy);
            }}
          >
            <option>{postById.bibleVerseId}</option>
            {verseArray.map((number) => {
              return (
                <option key={number} value={number}>
                  {number}
                </option>
              );
            })}
          </Form.Select>

          <h2>Title: </h2>
          <Form.Control
            placeholder="Enter Title"
            type="text"
            value={updatePosts.title}
            onChange={(e) => {
              const chosenTitle = e.target.value;
              const copy = { ...updatePosts };
              copy.title = chosenTitle;
              setUpdatePosts(copy);
            }}
          ></Form.Control>
          <h2>Description</h2>
          <Form.Control
            placeholder="Enter Description"
            type="text"
            value={updatePosts.body}
            onChange={(e) => {
              const chosenDesc = e.target.value;
              const copy = { ...updatePosts };
              copy.body = chosenDesc;
              setUpdatePosts(copy);
            }}
          ></Form.Control>
        </form>
        <div className="button-editpost">
          <Button onClick={handleSave}>
            Save Updates
            <div className="button-icon-edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>
            </div>
          </Button>
          <Button onClick={handleDelete}>
            Delete Post
            <div className="button-icon-edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};
