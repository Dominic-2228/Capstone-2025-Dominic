import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getComment } from "../services/userService.jsx";
import { Button, Card } from "react-bootstrap";
import { deleteComment } from "../services/AllPostServices.jsx";

export const CommentPost = ({ currentUser }) => {
  const { postId } = useParams();
  const [render, setRender] = useState(true)

  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComment().then(setComments);
  }, [render]);

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
                  {parseInt(currentUser.id) === post.user?.id ? (
                    <button
                      onClick={() =>
                        deleteComment(post.id).then(() => {
                          setRender((prev) => !prev);
                        })
                      }
                    >
                      Delete
                    </button>
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
