import { fetchWithoutResponse, fetchWithResponse } from "./fetcher.js";

export const getAllPost = (id = undefined) => {
  try {
    let url = "posts?user_id=${userId}";

    // If an id is provided, fetch a single user
    if (id) {
      url += `/${id}`;
    }

    const stored = localStorage.getItem("bible_user");
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token;
    console.log(token);

    return fetchWithResponse(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
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
    console.log(token);

    return fetchWithResponse(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(post),
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return []; // optional fallback for logged-out users
  }
};

export const createUpdatePost = (post, postId = undefined) => {
  let url = "posts";

    if (postId) {
      url += `/${postId}`;
    }

  const stored = localStorage.getItem("bible_user");
  const parsed = stored ? JSON.parse(stored) : null;
  const token = parsed?.token;


  return fetchWithResponse(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

export const deletePost = (id) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/posts/${id}`, {
    method: "DELETE",
  });
};

// export const likePostPut = (id, updatedPost) => {
//   let url = `userlikes/${id}`;

//   const stored = localStorage.getItem("bible_user");
//   const parsed = stored ? JSON.parse(stored) : null;
//   const token = parsed?.token;

//   return fetchWithResponse(url, {
//     method: "PUT",
//     headers: {
//       Authorization: `Token ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedPost),
//   });
// };

export const getLikedPosts = (id) => {
  let url = `userlikes/${id}`;

  const stored = localStorage.getItem("bible_user");
  const parsed = stored ? JSON.parse(stored) : null;
  const token = parsed?.token;
  console.log(token);

  return fetchWithResponse(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
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
  let url = "notes";

  const stored = localStorage.getItem("bible_user");
  const parsed = stored ? JSON.parse(stored) : null;
  const token = parsed?.token;

  return fetchWithResponse(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
};

export const deleteNote = (id = undefined) => {
  let url = "notes";

  if (id) {
    url += `/${id}`;
  }

  return fetchWithResponse(url, {
    method: "DELETE",
  });
};

export const createUserLike = (obj) => {
  let url = "userlikes";

  const stored = localStorage.getItem("bible_user");
  const parsed = stored ? JSON.parse(stored) : null;
  const token = parsed?.token;

  return fetchWithResponse(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
};

export const deleteUserLike = (id) => {
  let url = `userlikes/${id}`;

  const stored = localStorage.getItem("bible_user");
  const parsed = stored ? JSON.parse(stored) : null;
  const token = parsed?.token;

  return fetchWithResponse(url, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
