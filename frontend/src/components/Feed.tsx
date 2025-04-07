import React, { useCallback, useEffect, useState } from 'react';
import PostCard from './PostCard';
import axios from 'axios';
import { Post } from '@/types';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MOCK_POSTS = [
  {
    id: '1',
    userId: 'user1',
    type: 'lost',
    title: 'Lost MacBook Pro',
    description: 'Lost my MacBook Pro in the library. It has a red case and some stickers.',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000'],
    location: 'University Library',
    category: 'Electronics',
    tags: ['laptop', 'macbook', 'library'],
    createdAt: new Date().toISOString(),
    likes: 5,
    comments: []
  },
  {
    id: '2',
    userId: 'user2',
    type: 'found',
    title: 'Found Student water bottle',
    description: 'Found a student ID card near the cafeteria.',
    images: ['https://cdn2.n2erp.co.nz/hyp_19sj232-ask2-dfk2-am29-89fkl348fd/images/products/xlarge/P0151410_1_L.jpg?auto=format&fit=crop&q=80&w=1000'],
    location: 'Student Center',
    category: 'Documents',
    tags: ['id', 'card', 'student'],
    createdAt: new Date().toISOString(),
    likes: 3,
    comments: []
  }
] as const;

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const token = localStorage.getItem('token');

  const fetchPostData = useCallback(async () => {
    try {
      const response = await axios.get<Post[]>(`${backendUrl}/api/lost?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const formattedPosts = response.data.map((item): Post => ({
        _id: item._id,
        loser: item.loser,
        type: item.type,
        name: item.name,
        description: item.description,
        images: item.images,
        position: item.position,
        category: item.category,
        status: item.status || 'unknown',
        createdAt: item.createdAt,
        likes: 0,
        comments: [],
        tags: item.tags || [],
        finder: item.finder || null,
        updatedAt: item.updatedAt,
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  },[token]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}