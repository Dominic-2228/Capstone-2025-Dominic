import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { deletePost, getAllPost, likePostPut } from "../services/AllPostServices.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export const AllPost = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllPost().then(setPosts);
  }, []);

  const clickLike = (postId) => {
    const updatedLikesInPost = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedLikesInPost);
    const updatedSinglePost = updatedLikesInPost.find(
      (post) => post.id === postId
    );
    likePostPut(postId, updatedSinglePost);
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
                    Posted By: {post.user.fullName}
                  </ListGroup.Item>
                  <ListGroup.Item>Book: {post.bibleBookId}</ListGroup.Item>
                  <ListGroup.Item>
                    Chapter: {post.bibleChapterId}
                  </ListGroup.Item>
                  <ListGroup.Item>Verse: {post.bibleVerseId}</ListGroup.Item>
                  <ListGroup.Item>
                    Posted At: {new Date(post.date).toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>Likes: {post.likes}</ListGroup.Item>
                </ListGroup>
                {currentUser.id !== post.userId ? (
                  <div>
                  <Card.Body>
                    <Button
                      onClick={() => {
                        clickLike(post.id);
                      }}
                    >
                      Like
                    </Button>
                  </Card.Body>
                  <Card.Body>
                      <Button onClick={() => {
                        navigate(`/comment/${post.id}`)
                      }}>Comment</Button>
                  </Card.Body>
                  </div>
                ) : (
                  <Card.Body>
                    <Button
                      onClick={() => {
                        navigate(`/myposts/${post.id}`);
                      }}
                    >
                      Edit
                    </Button>
                                      <Card.Body>
                      <Button onClick={() => {
                        navigate(`/comment/${post.id}`)
                      }}>Comment</Button>
                  </Card.Body>
                  </Card.Body>
                )}
                {currentUser.isStaff === true ? (
                  <Card.Body>
                    <Button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Card.Body>
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
