import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPostBookTranslation,
  getPostChapter,
} from "../services/apiCall.jsx";
import { createUpdatePost, deletePost } from "../services/AllPostServices.jsx";
import { getUserById } from "../services/userService.jsx";

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
      setPostById(postObj)
    });
  }, [postId]);
  console.log(postById)

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
    setUpdatePosts(postById)
  }, [postById])

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
    e.preventDefault()

    deletePost(postId).then(() => {
      navigate(`/myposts`)
    })
  }

  return (
    <>
      <h2>Update Post</h2>
      <form>
        <h2>Book</h2>
        <select
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
              <option placeholder={postById.bibleBookId} value={book.id} key={book.id}>
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
        </select>

        <h2>Verse</h2>
        <select
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
        </select>

        <h2>Title: </h2>
        <input
          placeholder="Enter Title"
          type="text"
          value={updatePosts.title}
          onChange={(e) => {
            const chosenTitle = e.target.value;
            const copy = { ...updatePosts };
            copy.title = chosenTitle;
            setUpdatePosts(copy);
          }}
        ></input>
        <h2>Description</h2>
        <input
          placeholder="Enter Description"
          type="text"
          value={updatePosts.body}
          onChange={(e) => {
            const chosenDesc = e.target.value;
            const copy = { ...updatePosts };
            copy.body = chosenDesc;
            setUpdatePosts(copy);
          }}
        ></input>
      </form>
      <button onClick={handleSave}>Save Updates</button>
      <button onClick={handleDelete}>Delete Post</button>
    </>
  );
};
