export const getUserByEmail = (email) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/users?email=${email}`).then(res => res.json())
}

export const createUser = (customer) => {
  return fetch("https://capstone-2025-dominic-3.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(customer)
  }).then(res => res.json())
}

export const getNonStaffUsers = () => {
  return fetch("https://capstone-2025-dominic-3.onrender.com/users?isStaff=false").then(res => res.json())
}

export const getStaffUsers = () => {
  return fetch("https://capstone-2025-dominic-3.onrender.com/users?isStaff=true").then(res => res.json())
}

export const getUserByUserId = (id) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/posts?userId=${id}&_expand=user`).then(res => res.json())
}

export const getUserById = (id) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/posts?id=${id}&_expand=user`).then(res => res.json())
}

export const getComment = () => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/comments?_expand=post&_expand=user`).then(res => res.json())
}

export const getProfileUsersById = (id) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/users?id=${id}`).then(res => res.json())
}

export const getNotesByUserId = (id) => {
  return fetch(`https://capstone-2025-dominic-3.onrender.com/notes?_userId=${id}`).then(res => res.json())
}