import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import axios from 'axios';
import toast from "react-hot-toast";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function CreatePost() {
  // const [files, setFiles] = useState<File[]>([]);
  // const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  // const [images, setImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'lost' | 'found'>('lost');
  const [tags, setTags] = useState('');

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const newImages = Array.from(files).map(file => URL.createObjectURL(file));
  //     setImages(prev => [...prev, ...newImages]);
  //   }
  // };

  // const removeImage = (index: number) => {
  //   setImages(prev => prev.filter((_, i) => i !== index));
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages(prev => [...prev, ...newImages]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      console.error("No authentication token found");
      return;
    }
    const formData = new FormData();
    for (const pair of formData.entries()) {
      console.log("FormData before appending:", pair[0], pair[1]);
    }
    formData.append("name", title);
    formData.append("status", type);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("position", location);
    formData.append("category", category);
    tags.split(",").map(tag => formData.append("tags", tag.trim())); // Append tags separately
    
    images.forEach((image, index) => {
      formData.append("images", image); // Append image files
    });
    for (const pair of formData.entries()) {
      console.log("FormData after appending:", pair[0], pair[1]);
    }

    try {
      const response = await axios.post(`${backendUrl}/api/lost`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Post created successfully:", response.data);
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post!");
    }
  
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Camera className="h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Upload Images</p>
            </label>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="lost"
                  checked={type === 'lost'}
                  onChange={(e) => setType(e.target.value as 'lost')}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 dark:text-gray-300">Lost</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="found"
                  checked={type === 'found'}
                  onChange={(e) => setType(e.target.value as 'found')}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 dark:text-gray-300">Found</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              required
            >
              <option value="" className='dark:text-gray-300'>Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Documents">Documents</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              placeholder="e.g., laptop, library, blue"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}