import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserById } from "../services/userService.jsx"
import { Card, ListGroup } from "react-bootstrap"

export const MyPost = ({currentUser}) => {

    const [myPosts, setMyPosts] = useState([])
  
  useEffect(() => {
    getUserById(currentUser.id).then(setMyPosts)
  }, [currentUser])


  return (
    <>
        <div className='AllPost-container'>
    {myPosts.map((post) => {
      return(
        <div className='allPost-idv'>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.body}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Posted By: {post.user.fullName}</ListGroup.Item>
        <ListGroup.Item>Posted At: {new Date(post.date).toLocaleString()}</ListGroup.Item>
        <ListGroup.Item>Likes: {post.likes}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Like</Card.Link>
        <Card.Link href="#">Edit</Card.Link>
      </Card.Body>
    </Card>
    </div>
      )
    })}
    </div>
    </>
  )
}