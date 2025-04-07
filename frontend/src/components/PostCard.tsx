import React, { useState, useCallback, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  BookmarkPlus,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Post } from "../types";
import axios from "axios";
import clsx from "clsx";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface PostCardProps {
  post: Post;
  fetchComments: (postId: string) => void;
}

export default function PostCard({ post, fetchComments }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = post.images.length;
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmitComment =
    (lostId: string, flag: string) => async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${backendUrl}/api/lost/comment`,
          {
            lostId,
            body: newComment,
            flags: flag,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(res.data.message);
        fetchComments(lostId);
        setNewComment("");
      } catch (error) {
        console.error("Error fetching post data:", error);
        toast.error("Error fetching post data");
      }
    };

  const handleComments = (postId: string) => {
    setShowComments(!showComments);
    fetchComments(postId);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < totalImages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  function formatLikes(count: number) {
    if (count >= 1_000_000)
      return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (count >= 1_000)
      return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return count.toString();
  }

  const [showReplyInput, setShowReplyInput] = useState<{
    [key: string]: boolean;
  }>({});
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});

  const toggleReplyInput = (commentId: string) => {
    setShowReplyInput((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleReplySubmit = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    const reply = replyTexts[commentId];
    if (!reply.trim()) return;

    // your API call here to add reply

    setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
    setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));
  };

  const handleLikeComment = (commentId: string) => {
    // your API call to like
  };

  const handleDislikeComment = (commentId: string) => {
    // your API call to dislike
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={`https://api.dicebear.com/7.x/avatars/svg?seed=${post.loser._id}`}
            alt="User avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {post.loser.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.position}
            </p>
          </div>
        </div>
      </div>
      <div className="relative pb-[100%]">
        <img
          src={post.images[currentIndex].url}
          alt={post.name}
          className="absolute h-full w-full object-cover"
        />

        {totalImages > 1 && (
          <>
            {/* Left Button */}
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/60 hover:bg-white p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft />
            </button>

            {/* Right Button */}
            <button
              onClick={goToNext}
              disabled={currentIndex === totalImages - 1}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/60 hover:bg-white p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <button
              onClick={handleLike}
              className={clsx(
                "transition-colors",
                liked ? "text-pink-500" : "text-gray-500 dark:text-gray-400",
                animate && "animate-like"
              )}
            >
              <Heart className="h-6 w-6" />
              <span className="text-sm font-medium">
                {formatLikes(post.likes)}
              </span>
            </button>
            <button
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400"
              onClick={() => handleComments(post._id)}
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm font-medium">
                {formatLikes(post.comments.length)}
              </span>
            </button>
            <button className="text-gray-500 hover:text-green-500 dark:text-gray-400">
              <Share2 className="h-6 w-6" />
              <span className="text-sm font-medium">Share</span>
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

        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          {post.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {post.description}
        </p>

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
                  <div key={comment._id} className="mb-3">
                    <div className="flex items-start">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`https://api.dicebear.com/7.x/avatars/svg?seed=${comment.poster._id}`}
                        alt="User avatar"
                      />
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {comment.poster.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {comment.body}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>

                        {/* Like/Dislike/Reply actions */}
                        <div className="flex space-x-4 text-xs mt-2 text-gray-500 dark:text-gray-400">
                          <button
                            onClick={() => handleLikeComment(comment._id)}
                          >
                            ❤️{" "}
                            {comment.count.likes > 0
                              ? formatLikes(comment.count.likes)
                              : 0}
                          </button>
                          <button
                            onClick={() => handleDislikeComment(comment._id)}
                          >
                            👎{" "}
                            {comment.count.dislikes > 0
                              ? comment.count.dislikes
                              : 0}
                          </button>
                          <button onClick={() => toggleReplyInput(comment._id)}>
                            💬 Reply {" "}
                            {comment.count.comments > 0
                              ? comment.count.comments
                              : 0}
                          </button>
                        </div>

                        {/* Reply input */}
                        {showReplyInput[comment._id] && (
                          <form
                            onSubmit={(e) => handleReplySubmit(e, comment._id)}
                            className="mt-2 flex items-center space-x-2"
                          >
                            <input
                              type="text"
                              value={replyTexts[comment._id] || ""}
                              onChange={(e) =>
                                setReplyTexts({
                                  ...replyTexts,
                                  [comment._id]: e.target.value,
                                })
                              }
                              placeholder="Write a reply..."
                              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1 text-sm"
                            />
                            <button
                              type="submit"
                              className="text-blue-500 hover:text-blue-600"
                              disabled={!replyTexts[comment._id]?.trim()}
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </form>
                        )}

                        {/* Render replies */}
                        {Array.isArray(comment.replies) && comment.replies.length > 0 && (
                          <div className="mt-2 ml-4 border-l border-gray-200 dark:border-gray-700 pl-4">
                            {comment.replies.map((reply) => (
                              <div key={reply._id} className="mb-2">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {reply.poster.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {reply.body}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No comments yet
                </p>
              )}
            </div>
            <form
              onSubmit={handleSubmitComment(post._id, post.type)}
              className="flex items-center"
            >
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