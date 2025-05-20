import { useEffect, useState } from "react";
import { getUserByUserId } from "../services/userService.jsx";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MyPost = ({ currentUser }) => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    getUserByUserId(currentUser.id).then(setMyPosts);
  }, [currentUser]);

  return (
    <>
      <div className="AllPost-container">
        {myPosts.map((post) => {
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
                  <ListGroup.Item>Verse: {post.bibleVerseId}</ListGroup.Item>
                  <ListGroup.Item>
                    Posted At: {new Date(post.date).toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>Likes: {post.likes}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Button as={Link} to={`/myposts/${post.id}`}>
                    Edit{" "}
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
    </>
  );
};
