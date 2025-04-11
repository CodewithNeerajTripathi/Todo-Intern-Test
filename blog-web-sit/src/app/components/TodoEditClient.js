'use client';
import { useState } from 'react';
import "../globals.css"

export default function TodoEditClient({ todo }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleUpdate = async () => {
    const res = await fetch(`https://neeraj-project.onrender.com/api/todos/${todo._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) alert(" Post Updated Successfully!");
    else alert(" Failed to update.");
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 md:p-8">
       

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          placeholder="Enter description"
          className="w-full border border-gray-300 p-3 rounded-md mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
