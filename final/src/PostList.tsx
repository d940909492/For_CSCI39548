import React, { useState, useEffect } from 'react';
import {collection, query, orderBy, onSnapshot, type QuerySnapshot, type DocumentData, Timestamp} from 'firebase/firestore';
import { db } from './firebase';

export interface Post {
  id: string;
  text: string;
  authorId: string;
  authorEmail: string;
  createdAt: Timestamp;
}

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const formatDate = (timestamp: Timestamp | null | undefined) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') {
      return 'Just now';
    }
    return timestamp.toDate().toLocaleString();
  };

  return (
    <div className="post-item">
      <div className="post-item-header">
        <span className="post-author-email">{post.authorEmail}</span>
        <span className="post-timestamp">{formatDate(post.createdAt)}</span>
      </div>
      <p>{post.text}</p>
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