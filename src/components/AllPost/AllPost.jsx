import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { getAllPost } from "../services/AllPostServices.jsx";
import { Link } from "react-router-dom";

export const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    getAllPost().then(setPosts);
  }, []);

  useEffect(() => {}, []);

  // const clickLike = (postId) => {

  //   const updatedLikesInPost = posts.map((post) => post.id === postId ? {...post, likes: post.likes + 1} : post)
  //   setPosts(updatedLikesInPost)
  //   const updatedSinglePost = post
  //   likePost(postId, updatedLikesInPost).then(res => res.json())
  // };

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
                <Card.Body>
                  <button onClick={() => {
                    clickLike(post.id)
                  }}>Like</button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};
