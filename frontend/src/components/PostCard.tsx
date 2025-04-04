import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, BookmarkPlus, Send } from 'lucide-react';
import type { Post, Comment } from '../types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement comment submission
    setNewComment('');
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={`https://api.dicebear.com/7.x/avatars/svg?seed=${post.userId}`}
            alt="User avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">User Name</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{post.location}</p>
          </div>
        </div>
      </div>

      <div className="relative pb-[100%]">
        <img
          src={post.images[0]}
          alt={post.title}
          className="absolute h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <button className="text-gray-500 hover:text-red-500 dark:text-gray-400">
              <Heart className="h-6 w-6" />
            </button>
            <button 
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-green-500 dark:text-gray-400">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
          <button className="text-gray-500 hover:text-yellow-500 dark:text-gray-400">
            <BookmarkPlus className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">
            {post.type.toUpperCase()}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            {post.category}
          </span>
        </div>

        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{post.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{post.description}</p>

        <div className="mt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {/* Comments Panel */}
        {showComments && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="max-h-60 overflow-y-auto mb-4">
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="mb-3">
                    <div className="flex items-start">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`https://api.dicebear.com/7.x/avatars/svg?seed=${comment.userId}`}
                        alt="User avatar"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">User Name</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{comment.content}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet</p>
              )}
            </div>
            <form onSubmit={handleSubmitComment} className="flex items-center">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="ml-2 text-blue-500 hover:text-blue-600 dark:text-blue-400"
                disabled={!newComment.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}