import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { FirebaseError } from 'firebase/app';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("login in work");
      navigate('/');
    } catch (err) {
      console.error("error login in:", err);
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/user-not-found':
            setError('Invalid email, please try again');
            break;
          case 'auth/wrong-password':
            setError('Invalid password, please try again');
            break;
          case 'auth/invalid-credential':
            setError('Invalid email or password, please try again');
            break;
          case 'auth/invalid-email':
            setError('Please enter a valid email address');
            break;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container auth-container">
      <h2>Login to MiniTwitter</h2>
      <form onSubmit={handleLogin} className="auth-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="...@...(enter email)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="......(enter password)"
          />
        </div>
        <button type="submit" className="button auth-button" disabled={loading}>
          {loading ? 'Logging In' : 'Login'}
        </button>
      </form>
      <p className="auth-switch-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;