import { fetchWithoutResponse, fetchWithResponse } from "./fetcher.js"

export const getAllPost = (id = undefined) => {
try {
    let url = "posts";

    // If an id is provided, fetch a single user
    if (id) {
      url += `/${id}`;
    }

    const stored = localStorage.getItem("bible_user");
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token; 
    console.log(token)

    return fetchWithResponse(url, {
      headers: {
        Authorization: `Token ${token}`,
      }
    })
  } catch (error) {
    console.error("Error fetching packages:", error);
    return []; // optional fallback for logged-out users
  }
};

export const createCustomPost = (post) => {
try {
    let url = "posts";

    const stored = localStorage.getItem("bible_user");
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token; 
    console.log(token)

    return fetchWithResponse(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(post)
    })
  }
  catch (error) {
    console.error("Error fetching packages:", error);
    return []; // optional fallback for logged-out users
  }
  }

export const createUpdatePost = (post, postId) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

export const deletePost = (id) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/posts/${id}`, {
    method: "DELETE",
  });
};

export const likePostPut = (id, updatedPost) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  }).then((res) => res.json());
};

export const getLikedPosts = () => {
  return fetch(
    `https://capstone-2025-dominic-3.onrender.com/userLikes?_expand=user&_expand=post`
  ).then((res) => res.json());
};

export const postComments = (comment) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  }).then((res) => res.json());
};

export const saveUpdatedNote = (note) => {
  return fetch("https://capstone-2025-dominic-3.onrender.com/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
};

export const deleteNote = (id) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/notes/${id}`, {
    method: "DELETE"
  })
}

export const createUserLike = (obj) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/userLikes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
}
