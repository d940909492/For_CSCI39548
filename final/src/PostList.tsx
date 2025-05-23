import React, { useState, useEffect } from 'react';
import {
collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, 
serverTimestamp as firestoreServerTimestamp, type QuerySnapshot, type DocumentData, Timestamp} from 'firebase/firestore';
import { db, auth } from './firebase';

export interface Post {
  id: string;
  text: string;
  authorId: string;
  authorEmail: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const [loadingAction, setLoadingAction] = useState(false);

  const currentUser = auth.currentUser;

  const formatDate = (timestamp: Timestamp | null | undefined) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') {
      return 'Just post';
    }
    return timestamp.toDate().toLocaleString();
  };

  const handleDelete = async () => {
    if (!currentUser || currentUser.uid !== post.authorId) {
      return;
    }
    setLoadingAction(true);
    try {
      const postDocRef = doc(db, 'posts', post.id);
      await deleteDoc(postDocRef);
    } catch (err) {
      console.error("delete post error:", err);
      setLoadingAction(false);
    }
  };

  const handleEdit = () => {
    if (!currentUser || currentUser.uid !== post.authorId) {
      return;
    }
    setIsEditing(true);
    setEditText(post.text);
  };

  const handleSaveEdit = async () => {
    if (!currentUser || currentUser.uid !== post.authorId) {
      return;
    }
    if (!editText.trim()) {
      return;
    }
    setLoadingAction(true);
    try {
      const postDocRef = doc(db, 'posts', post.id);
      await updateDoc(postDocRef, {
        text: editText,
        updatedAt: firestoreServerTimestamp(),
      });
      setIsEditing(false);
    } catch (err) {
      console.error("update post error:", err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(post.text);
  };

  const canModify = currentUser && currentUser.uid === post.authorId;

  return (
    <div className="post-item">
      <div className="post-item-header">
        <span className="post-author-email">{post.authorEmail}</span>
        <span className="post-timestamp">
          {post.updatedAt ? `Edited: ${formatDate(post.updatedAt)}` : formatDate(post.createdAt)}
        </span>
      </div>
      {isEditing ? (
        <div className="post-edit-area">
          <textarea
            className="post-edit-textarea"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={5}
            maxLength={200}
          />
          <div className="post-edit-actions">
            <button onClick={handleSaveEdit} className="button save-button" disabled={loadingAction}>
              {loadingAction ? 'Saving' : 'Save'}
            </button>
            <button onClick={handleCancelEdit} className="button cancel-button" disabled={loadingAction}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="post-text">{post.text}</p>
      )}
      {canModify && !isEditing && (
        <div className="post-actions">
          <button onClick={handleEdit} className="button edit-button" disabled={loadingAction}>
            Edit
          </button>
          <button onClick={handleDelete} className="button delete-button" disabled={loadingAction}>
            {loadingAction ? 'Deleting' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  );
};

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const postsCollectionRef = collection(db, 'posts');
    const q = query(postsCollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const postsData: Post[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          postsData.push({
            id: doc.id,
            text: data.text,
            authorId: data.authorId,
            authorEmail: data.authorEmail,
            createdAt: data.createdAt as Timestamp,
            updatedAt: data.updatedAt as Timestamp | undefined,
          });
        });
        setPosts(postsData);
        setLoading(false);
      },
      (err) => {
        console.error("load post error: ", err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="loading-message">Loading posts</p>;
  }

  if (posts.length === 0) {
    return <p className="no-posts-message">no post yet, please post something</p>;
  }

  return (
    <div className="post-list-container">
      <h3>Posts list: </h3>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;