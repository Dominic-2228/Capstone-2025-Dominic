export const getAllPost = () => {
  return fetch("http://localhost:8088/posts?_expand=user").then((res) =>
    res.json()
  );
};

export const createCustomPost = (post) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

export const createUpdatePost = (post, postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

export const deletePost = (id) => {
  return fetch(`http://localhost:8088/posts/${id}`, {
    method: "DELETE",
  });
};

export const likePostPut = (id, updatedPost) => {
  return fetch(`http://localhost:8088/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  }).then((res) => res.json());
};

export const getLikedPosts = () => {
  return fetch(
    `http://localhost:8088/userLikes?_expand=user&_expand=post`
  ).then((res) => res.json());
};

export const postComments = (comment) => {
  return fetch(`http://localhost:8088/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  }).then((res) => res.json());
};

export const saveUpdatedNote = (note) => {
  return fetch("http://localhost:8088/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
};

export const deleteNote = (id) => {
  return fetch(`http://localhost:8088/notes/${id}`, {
    method: "DELETE"
  })
}

export const createUserLike = (obj) => {
  return fetch(`http://localhost:8088/userLikes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
}
