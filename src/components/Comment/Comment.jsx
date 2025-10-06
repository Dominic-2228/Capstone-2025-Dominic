import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getComment } from "../services/userService.jsx";
import { Button, Card } from "react-bootstrap";
import { deleteComment } from "../services/AllPostServices.jsx";

export const CommentPost = ({ currentUser }) => {
  const { postId } = useParams();

  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComment().then(setComments);
  }, []);

  return (
    <>
      <div className="create-comment">
        <Button as={Link} to={`/createcomment/${parseInt(postId)}`}>
          Create Comment
        </Button>
        {comments.map((post) => {
          return (
            <div key={post.id}>
              {post.post === parseInt(postId) ? (
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>User: {post?.user?.first_name}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>
                  </Card.Body>
                  {parseInt(currentUser) !== post.user ? (
                    <button onClick={deleteComment}>Delete</button>
                  ) : (
                    ""
                  )}
                </Card>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
