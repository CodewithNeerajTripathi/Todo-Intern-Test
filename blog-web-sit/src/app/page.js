'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './globals.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTodos = async () => {
    const res = await fetch(`https://neeraj-project.onrender.com/api/todos?page=${page}&limit=3`);
    const data = await res.json();
    setTodos(data);
  };

  const deleteTodo = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    const res = await fetch(`https://neeraj-project.onrender.com/api/todos/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchTodos();
    } else {
      alert('Failed to delete');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#f4f6f8] py-10 px-4 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          📰 Latest Posts
        </h1>

        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white rounded-lg shadow-md p-6 mb-6 transition duration-300 hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{todo.title}</h2>
            <p className="text-gray-600 mt-2">{todo.description}</p>
            <p className="text-sm text-gray-400 mt-2">
              Posted on: {new Date(todo.date).toLocaleString()}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={`/todos/${todo._id}`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 text-blue-600 hover:underline disabled:opacity-50"
            disabled={page === 1}
          >
            ← Prev
          </button>
          <span className="text-gray-700 font-medium">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 text-blue-600 hover:underline disabled:opacity-50"
            disabled={todos.length < 3}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
