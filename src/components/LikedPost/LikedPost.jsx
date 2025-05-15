import { useEffect, useState } from "react";
import { getLikedPosts, likePostPut } from "../services/AllPostServices.jsx";
import { Button, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";

export const LikedPost = ({currentUser}) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getLikedPosts().then(setPosts);
  }, []);
  
  const userLiked = posts.filter((post) => post.userId === currentUser.id)

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

  return <>
  <div>
      <div className="AllPost-container">
        {userLiked.map((post) => {
          return (
            <div className="allPost-idv">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{post.post.title}</Card.Title>
                  <Card.Text>{post.post.body}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    Posted By: {post.user.fullName}
                  </ListGroup.Item>
                  <ListGroup.Item>Book: {post.post.bibleBookId}</ListGroup.Item>
                  <ListGroup.Item>
                    Chapter: {post.post.bibleChapterId}
                  </ListGroup.Item>
                  <ListGroup.Item>Verse: {post.post.bibleVerseId}</ListGroup.Item>
                  <ListGroup.Item>
                    Posted At: {new Date(post.post.date).toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>Likes: {post.post.likes}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Button
                    onClick={() => {
                      navigate(`/myposts/${post.id}`)
                    }}
                  >
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
  </div>
  </div>
  </>;
};
