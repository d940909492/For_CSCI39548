import React from 'react';
import { auth } from './firebase';
import CreatePost from './CreatePost';
import PostList from './PostList';

const HomePage: React.FC = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("sign out work");
    } catch (error) {
      console.error("sign out error: ", error);
    }
  };

  return (
    <div className="page-container home-page">
      <div className="home-header">
        <h2>Home Page</h2>
        <p>Since only function right now is posting, just try post something</p>
        <button onClick={handleLogout} className="button logout-button">
          Logout
        </button>
      </div>
      <CreatePost />
      <hr/>
      <PostList />
    </div>
  );
};

export default HomePage;