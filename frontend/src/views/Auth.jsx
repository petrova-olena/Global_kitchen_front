import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../auth.css";
import signInImg from "../assets/sign_in.png";
import signUpImg from "../assets/sign_up.png";

const Auth = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);

  const [signinForm, setSigninForm] = useState({
    username: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signinForm),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/profile");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupForm),
    });

    if (res.ok) {
      setIsSignIn(true);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isSignIn ? "left" : "right"}`}>
        <div
          key={isSignIn ? "signin" : "signup"}
          className="auth-image"
          style={{
            backgroundImage: `url(${isSignIn ? signInImg : signUpImg})`,
          }}
        />

        <div className="auth-form">
          {isSignIn ? (
            <>
              <h2>Sign In</h2>

              <form onSubmit={handleSignIn}>
                <input
                  type="text"
                  placeholder="Username"
                  value={signinForm.username}
                  onChange={(e) =>
                    setSigninForm({ ...signinForm, username: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={signinForm.password}
                  onChange={(e) =>
                    setSigninForm({ ...signinForm, password: e.target.value })
                  }
                />

                <button type="submit">Sign In</button>
              </form>

              <p onClick={() => setIsSignIn(false)}>
                Don't have an account? Sign Up
              </p>
            </>
          ) : (
            <>
              <h2>Sign Up</h2>

              <form onSubmit={handleSignUp}>
                <input
                  type="text"
                  placeholder="Username"
                  value={signupForm.username}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, username: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                />

                <button type="submit">Sign Up</button>
              </form>

              <p onClick={() => setIsSignIn(true)}>
                Already have an account? Sign In
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
