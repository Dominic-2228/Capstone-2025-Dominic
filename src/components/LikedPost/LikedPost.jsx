import { useEffect, useState } from "react";
import { getLikedPosts } from "../services/AllPostServices.jsx";
import { Button, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";

export const LikedPost = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLikedPosts().then(setPosts);
  }, []);

  const userLiked = posts.filter((post) => post.userId === currentUser.id);
  console.log(userLiked)

  // const clickLike = (postId) => {
  //   const updatedLikesInPost = posts.map((post) =>
  //     post.id === postId ? { ...post, likes: post.likes + 1 } : post
  //   );
  //   setPosts(updatedLikesInPost);
  //   const updatedSinglePost = updatedLikesInPost.find(
  //     (post) => post.id === postId
  //   );
  //   likePostPut(postId, updatedSinglePost);
  // };

  return (
    <>
      <div>
        <div className="AllPost-container">
          {userLiked.map((post) => {
            return (
              <div className="allPost-idv">
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{post.post?.title}</Card.Title>
                    <Card.Text>{post.post?.body}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      Posted By: {post.post?.user?.fullName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Book: {post.post?.bibleBookId}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Chapter: {post.post?.bibleChapterId}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Verse: {post.post?.bibleVerseId}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Posted At: {new Date(post.post?.date).toLocaleString()}
                    </ListGroup.Item>
                    <ListGroup.Item>Likes: {post.post?.likes}</ListGroup.Item>
                  </ListGroup>
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
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
