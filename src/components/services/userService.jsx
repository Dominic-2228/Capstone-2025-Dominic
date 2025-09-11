import { fetchWithoutResponse, fetchWithResponse } from "./fetcher.js"

export const getUserByEmail = async (request) => {
  const body = JSON.stringify(request)
  console.log("Sending login body:", body);

  const res = await fetchWithoutResponse(`users/login`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  const data = await res.json();
  return Response.json(data);
}

export const createUser = (customer) => {
  let url = "users/register"
  return fetchWithResponse(url , {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(customer)
  }).then(res => res.json())
}

export const getNonStaffUsers = () => {
  try {
    let url = "users?is_staff=false"

    const stored = localStorage.getItem("bible_user");
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token;

    return fetchWithResponse(url, {
      headers: {
        Authorization: `Token ${token}`,
      }
    })
  }
  catch (error) {
    console.error("Error fetching packages:", error);
    return []; // optional fallback for logged-out users
  }
}

export const getStaffUsers = () => {
  try {
    let url = "users?is_staff=true"

    const stored = localStorage.getItem("bible_user");
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token; 

    return fetchWithResponse(url, {
      headers: {
        Authorization: `Token ${token}`,
      }
    })
  }
  catch (error) {
    console.error("Error fetching packages:", error);
    return []; // optional fallback for logged-out users
  }
}

// export const getProfileUsersById = (id) => {
//  try {
//     let url = `users?user=${id}`

//     return fetchWithResponse(url, {
//       headers: {
//         Authorization: `Token ${localStorage.getItem("token")}`,
//       }
//     })
//   }
//   catch (error) {
//     console.error("Error fetching packages:", error);
//     return []; // optional fallback for logged-out users
//   }
// }

// setting front-end to backend django.

export const getUserByPostId = (id = undefined) => {
    try {
    let url = "posts";

    // If an id is provided, fetch a single review
    if (id) {
      url += `/${id}`;
    }

    const stored = localStorage.getItem("bible_user");
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token; 

    return fetchWithResponse(url, {
      headers: {
        Authorization: `Token ${token}`,
      }
    })
  } catch (error) {
    console.error("Error fetching packages:", error);
    return []; // optional fallback for logged-out users
  }
}

//this may be conflicting with getProfileUserById
export const getUser = (id = undefined) => {
  try {
    let url = "users";

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

export const getNotesByUserId = (id = undefined) => {
  try {
    let url = "notes";

    // If an id is provided, fetch a single review
    if (id) {
      url += `/${id}`;
    }

    const stored = localStorage.getItem("bible_user");
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token; 

    return fetchWithResponse(url, {
      headers: {
        Authorization: `Token ${token}}`,
      }
    })
  } catch (error) {
    console.error("Error fetching packages:", error);
    return []; // optional fallback for logged-out users
  }
}

export const getComment = (id = undefined) => {
    try {
    let url = "notes";

    // If an id is provided, fetch a single review
    if (id) {
      url += `/${id}`;
    }

    const stored = localStorage.getItem("bible_user");
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token; 

    return fetchWithResponse(url, {
      headers: {
        Authorization: `Token ${token}`,
      }
    })
  } catch (error) {
    console.error("Error fetching packages:", error);
    return []; // optional fallback for logged-out users
  }
}