'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import "../globals.css"

export default function AddTodoPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      router.push('/todos');
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <div className="px-4 bg-[#cae9d3]  rounded-lg py-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={6}
          className="w-full px-4 text-black py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        >
          Submit Post
        </button>
      </form>
    </div>

    
  );
}
