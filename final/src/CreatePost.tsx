import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';
import { FirebaseError } from 'firebase/app';

const CreatePost: React.FC = () => {
  const [postText, setPostText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!postText.trim()) {
      setError("Post cannot be empty.");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("You must be logged in to post.");
      return;
    }

    setLoading(true);
    try {
      const postsCollectionRef = collection(db, 'posts');
      await addDoc(postsCollectionRef, {
        text: postText,
        authorId: currentUser.uid,
        authorEmail: currentUser.email,
        createdAt: serverTimestamp(),
      });
      console.log("post create work");
      setPostText('');
    } catch (err) {
      console.error("error create post: ", err);
      if (err instanceof FirebaseError) {
        setError(`error creating post: ${err.message}`);
      } else {
        setError('unkown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h3>Create post</h3>
      <form onSubmit={handleCreatePost} className="create-post-form">
        {error && <p className="error-message">{error}</p>}
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="write something down(less than 200 characters)"
          rows={3}
          maxLength={200}
          required
          className="post-textarea"
        />
        <div className="create-post-footer">
          <span className="char-count">{postText.length}/200</span>
          <button type="submit" className="button post-submit-button" disabled={loading}>
            {loading ? 'Posting' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;