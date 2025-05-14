import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from "react"
import { getAllPost } from "../services/AllPostServices.jsx"
import { Link } from 'react-router-dom';

export const AllPost = () => {
    const [posts, setPosts] = useState([])
    const [bibleApi, setBibleApi] = useState([])

    useEffect(() => {
      getAllPost().then(setPosts)
    }, [])

    useEffect(() => {

    }, [])
  
  return (
    <>
    <div className='AllPost-container'>
    {posts.map((post) => {
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
        <ListGroup.Item>Chapter: {post.bibleChapterId}</ListGroup.Item>
        <ListGroup.Item>Verse: {post.bibleVerseId}</ListGroup.Item>
        <ListGroup.Item>Posted At: {new Date(post.date).toLocaleString()}</ListGroup.Item>
        <ListGroup.Item>Likes: {post.likes}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link >Like</Card.Link>
      </Card.Body>
    </Card>
    </div>
      )
    })}
    </div>
    </>
  )
}