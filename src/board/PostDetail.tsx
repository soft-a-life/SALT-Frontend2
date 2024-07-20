import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetail.css';

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  content: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://172.20.10.12:8080/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p>작성자: {post.author}</p>
      <p>작성일: {post.date}</p>
      <p>조회수: {post.views}</p>
      <div className="post-content">
        {post.content}
      </div>
    </div>
  );
};

export default PostDetail;
