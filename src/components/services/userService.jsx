export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then(res => res.json())
}

export const createUser = (customer) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(customer)
  }).then(res => res.json())
}

export const getNonStaffUsers = () => {
  return fetch("http://localhost:8088/users?isStaff=false").then(res => res.json())
}

export const getStaffUsers = () => {
  return fetch("http://localhost:8088/users?isStaff=true").then(res => res.json())
}

export const getUserByUserId = (id) => {
  return fetch(`http://localhost:8088/posts?userId=${id}&_expand=user`).then(res => res.json())
}

export const getUserById = (id) => {
  return fetch(`http://localhost:8088/posts?id=${id}&_expand=user`).then(res => res.json())
}

export const getComment = () => {
  return fetch(`http://localhost:8088/comments?_expand=post&_expand=user`).then(res => res.json())
}

export const getProfileUsersById = (id) => {
  return fetch(`http://localhost:8088/users?id=${id}`).then(res => res.json())
}

export const getNotesByUserId = (id) => {
  return fetch(`http://localhost:8088/notes?_userId=${id}`).then(res => res.json())
}