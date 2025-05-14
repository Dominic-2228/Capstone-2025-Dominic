export const getAllPost = () => {
  return fetch("http://localhost:8088/posts?_expand=user").then(res => res.json())
}

export const createCustomPost = (post) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
}

export const createUpdatePost = (post, postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
} 

export const deletePost = (id) => {
  return fetch(`http://localhost:8088/posts/${id}`, {
    method: "DELETE"
  })
}