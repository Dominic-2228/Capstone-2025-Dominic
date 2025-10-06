import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { postComments } from "../services/AllPostServices.jsx";

export const CreateComment = ({ currentUser }) => {
  const { postId } = useParams();
  const [comment, setComment] = useState({
    body: "",
    user: currentUser.id,
    post: parseInt(postId),
  });

  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();

    console.log(comment);

    if (comment.body && comment.user && comment.post) {
    try {
      await postComments(comment);
      navigate(`/comment/${postId}`);
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
    }
  };

  return (
    <>
      <div>
        <div className="createUpdatepost-container">
          <Form className="form-container">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  const copy = { ...comment };
                  copy.body = e.target.value;
                  setComment(copy);
                }}
              />
            </Form.Group>
            <Button
              onClick={handleSave}
            >
              Save
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
