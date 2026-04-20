import React, { useState } from 'react';

const Auth = () => {
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupForm),
      });
      const data = await response.json();
      if (response.ok) {
        //alert('New user created!');
        console.log('New user created:', data);
        setSignupForm({ username: '', email: '', password: '' });
      } else {
        //alert(data.message || 'User creation failed');
        console.error('Error creating user:', data.message);
      }
    } catch (err) {
      //alert('Server error', err);
      console.error('Error creating user:', err);
    }
  };

  return (
    <div>
      <h1>Auth Page</h1>
      <div id="sign-in">
        <h2>Sign In</h2>
      </div>
      <div id="sign-up">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Enter your username"
            value={signupForm.username}
            onChange={(e) =>
              setSignupForm({ ...signupForm, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={signupForm.email}
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={signupForm.password}
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
