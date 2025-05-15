import { useEffect, useState } from "react"
import { getUserByUserId } from "../services/userService.jsx"
import { Button, Card, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

export const MyPost = ({currentUser}) => {

    const [myPosts, setMyPosts] = useState([])
  
  useEffect(() => {
    getUserByUserId(currentUser.id).then(setMyPosts)
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
        <ListGroup.Item>Book: {post.bibleBookId}</ListGroup.Item>
        <ListGroup.Item>Verse: {post.bibleVerseId}</ListGroup.Item>
        <ListGroup.Item>Posted At: {new Date(post.date).toLocaleString()}</ListGroup.Item>
        <ListGroup.Item>Likes: {post.likes}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button as={Link} to={`/myposts/${post.id}`}>Edit</Button>
      </Card.Body>
    </Card>
    </div>
      )
    })}
    </div>
    </>
  )
}