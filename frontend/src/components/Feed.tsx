import React from 'react';
import PostCard from './PostCard';

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
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {MOCK_POSTS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}