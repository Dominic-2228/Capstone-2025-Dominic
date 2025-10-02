import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../services/userService.jsx";

export const Login = () => {
  const [username, set] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    getUserByEmail(userData)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.user) {
          const user = data.user;
          localStorage.setItem(
            "bible_user",
            JSON.stringify({
              id: user.id,
              isStaff: user.is_superuser,
              token: data.token,
            })
          );
          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className="container-login">
      <img
        className="bible-logo"
        src="IMG/ChatGPT Image May 14, 2025, 11_24_32 AM.png"
        alt="bible"
      ></img>
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>BibleVerse Login</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="username"
                value={username}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control"
                placeholder="Password"
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
