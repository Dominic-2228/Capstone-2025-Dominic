import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../services/userService.jsx"

export const Register = () => {
  const [customer, setCustomer] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    isStaff: false,
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "bible_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.is_staff,
          })
        )

        navigate("/login")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()

    const userData = {
      username: customer.username,
      password: customer.password
    }
    getUserByEmail(userData).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that username already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateCustomer = (evt) => {
    const copy = { ...customer }
    copy[evt.target.id] = evt.target.value
    setCustomer(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>BibleVerse</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="firstname"
              className="form-control"
              placeholder="Enter your First name"
              required
              autoFocus
            />
          </div>
        </fieldset>
          <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="lastname"
              className="form-control"
              placeholder="Enter your Last name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="email"
              className="form-control"
              placeholder="Enter your Email Address"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="username"
              id="username"
              className="form-control"
              placeholder="Username"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
        </fieldset>

{/* need to find another option for logging in as an admin */}
        {/* <fieldset>
          <div className="form-group">
            <label>
              <input
                onChange={(evt) => {
                  const copy = { ...customer }
                  copy.isStaff = evt.target.checked
                  setCustomer(copy)
                }}
                type="checkbox"
                id="isStaff"
              />
              I am an employee{" "}
            </label>
          </div>
        </fieldset> */}


        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
