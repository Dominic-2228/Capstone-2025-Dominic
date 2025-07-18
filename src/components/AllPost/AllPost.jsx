import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import {
  createUserLike,
  deletePost,
  getAllPost,
  likePostPut,
} from "../services/AllPostServices.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getPostChapter } from "../services/apiCall.jsx";

export const AllPost = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [selection, setSelection] = useState([]);
  const [verse, setVerse] = useState("");
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllPost().then(setPosts);
  }, []);

    useEffect(() => {
      posts.map((post) => {
        getPostChapter(post.bibleBookId, post.bibleChapterId).then(setSelection);
      });
    }, [posts]);

  useEffect(() => {
    if (!selection?.chapter?.content || !posts.length) {
      return;
    } else {
      const matchingVerses = selection.chapter?.content.filter((verse) =>
        posts.some((post) => verse.number === post.bibleVerseId)
      );

      console.log(matchingVerses)

      const verseContent = matchingVerses
        .map((verse) => verse.content?.map((verse) => verse))
        .join(" ");

      setVerse(verseContent);
    }
  }, [posts, selection.chapter?.content]);

  const clickLike = (postId) => {
    const updatedLikesInPost = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedLikesInPost);
    const updatedSinglePost = updatedLikesInPost.find(
      (post) => post.id === postId
    );
    likePostPut(postId, updatedSinglePost);

    const likedPost = {
      postId: postId,
      userId: currentUser.id,
    };

    createUserLike(likedPost).then((res) => res.json());
  };

  const handleDelete = (e) => {
    e.preventDefault();

    deletePost(e).then(() => {
      navigate(`/myposts`);
    });
  };

  return (
    <>
      <div className="AllPost-container">
        {posts.map((post) => {
          return (
            <div className="allPost-idv">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    Posted By: {post.user?.fullName}
                  </ListGroup.Item>
                  <ListGroup.Item>Book: {post.bibleBookId}</ListGroup.Item>
                  <ListGroup.Item>
                    Chapter: {post.bibleChapterId}
                  </ListGroup.Item>
                  <ListGroup.Item>Verse Number: {post.bibleVerseId}</ListGroup.Item>
                  {/* <ListGroup.Item>Content: {verse}</ListGroup.Item> */}
                  <ListGroup.Item>
                    Posted At: {new Date(post.date).toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>Likes: {post.likes}</ListGroup.Item>
                </ListGroup>
                {currentUser.id !== post.userId ? (
                  <div className="button-editpost">
                    <Card.Body>
                      <Button
                        onClick={() => {
                          clickLike(post.id);
                        }}
                      >
                        {" "}
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
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                          </svg>
                        </div>
                      </Button>
                    </Card.Body>
                    <Card.Body>
                      <Button
                        onClick={() => {
                          navigate(`/comment/${post.id}`);
                        }}
                      >
                        {" "}
                        <div className="button-icon-edit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                            />
                          </svg>
                        </div>
                      </Button>
                    </Card.Body>
                  </div>
                ) : (
                  <div className="button-editpost">
                    <Card.Body>
                      <Button
                        onClick={() => {
                          navigate(`/myposts/${post.id}`);
                        }}
                      >
                        {" "}
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
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        </div>
                      </Button>
                    </Card.Body>
                    <Card.Body>
                      <Button
                        onClick={() => {
                          navigate(`/comment/${post.id}`);
                        }}
                      >
                        {" "}
                        <div className="button-icon-edit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                            />
                          </svg>
                        </div>
                      </Button>
                    </Card.Body>
                  </div>
                )}
                {currentUser.isStaff === true ? (
                  <div className="button-editpost">
                    <Card.Body>
                      <Button
                        onClick={() => {
                          handleDelete(post.id);
                        }}
                      >
                        {" "}
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
                    </Card.Body>
                  </div>
                ) : (
                  ""
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};
