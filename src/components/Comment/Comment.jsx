import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getComment } from "../services/userService.jsx";
import { Button, Card } from "react-bootstrap";

export const CommentPost = () => {
  const { postId } = useParams();

  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComment().then(setComments);
  }, []);


return (
  <>
    <div className="create-comment">
      <Button as={Link} to={`/createcomment/${parseInt(postId)}`}>Create Comment</Button>
      {comments.map((post) => {
        return (
          <div key={post.id}>
            {post.postId === parseInt(postId) ? 
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>User: {post.user.fullName}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                </Card.Body>
              </Card> : ''
            }
          </div>
        );
      })}
    </div>
  </>
);
};
