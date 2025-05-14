import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../services/userService.jsx";

export const Login = () => {
  const [email, set] = useState("nunyas@nope.com");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "bible_user",
          JSON.stringify({
            id: user.id,
            isStaff: user.isStaff,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="container-login">
        <img className="bible-logo" src="IMG/ChatGPT Image May 14, 2025, 11_24_32 AM.png" alt="bible"></img>
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>BibleVerse Login</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
          <fieldset>
            <Link to="/register">Not a member yet?</Link>
          </fieldset>
        </form>
      </section>
    </main>
  );
};
