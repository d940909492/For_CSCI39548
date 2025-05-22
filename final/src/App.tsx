import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        console.log("User is logged in:", user.uid, "Email:", user.email);
      } else {
        console.log("User is logged out");
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading-container"><p>Loading</p></div>;
  }

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-logo">MiniTwitter</Link>
          <div className="nav-links">
            {!currentUser ? (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </>
            ) : (
              <>
                <span className="nav-user-email">{currentUser.email}</span>
              </>
            )}
          </div>
        </nav>
        <main className="content-container">
          <Routes>
            <Route
              path="/"
              element={currentUser ? <HomePage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/login"
              element={!currentUser ? <LoginPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/signup"
              element={!currentUser ? <SignUpPage /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;