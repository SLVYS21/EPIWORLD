import React from 'react';
import { Settings, MapPin } from 'lucide-react';
import type { Post } from '../types';

const MOCK_USER = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=john',
  bio: 'Student at University | Lost and Found Helper',
  location: 'Main Campus'
};

const MOCK_USER_POSTS: Post[] = [
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
  }
];

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <img
                src={MOCK_USER.avatar}
                alt={MOCK_USER.name}
                className="h-24 w-24 rounded-full"
              />
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{MOCK_USER.name}</h1>
                <p className="text-gray-500 dark:text-gray-400">{MOCK_USER.email}</p>
                <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{MOCK_USER.location}</span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{MOCK_USER.bio}</p>
              </div>
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
              <Settings className="h-5 w-5 mr-2" />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-gray-500 dark:text-gray-400">Posts</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">48</p>
              <p className="text-gray-500 dark:text-gray-400">Found</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
              <p className="text-gray-500 dark:text-gray-400">Helped</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Posts</h2>
            <div className="grid grid-cols-3 gap-4">
              {MOCK_USER_POSTS.map((post) => (
                <div key={post.id} className="relative group">
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm">{post.type.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}