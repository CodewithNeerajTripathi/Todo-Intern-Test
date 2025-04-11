'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../globals.css'

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTodos = async () => {
    const res = await fetch(`http://localhost:5000/api/todos?page=${page}&limit=3`);
    const data = await res.json();
    setTodos(data);
  };

  const deleteTodo = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
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
    <div className=" py-8 w-10/10 px-5 md:px-10 flex flex-col justify-center items-center bg-[#78839d] text-[black] ">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center  ">📰 Latest Posts</h1>

      {todos.map((todo) => (
        <div
          key={todo._id}
          className="mb-10 pb-6  "
        >
          <h2 className="text-xl md:text-2xl font-semibold">{todo.title}</h2>
          <p className="text-base md:text-md mt-2">{todo.description}</p>
          <small className="text-gray-500 block mt-2">{new Date(todo.date).toLocaleString()}</small>

          <div className="mt-4 flex flex-wrap gap-4">
            <Link href={`/todos/${todo._id}`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Edit
              </button>
            </Link>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="text-center mt-8 flex justify-center items-center gap-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="text-blue-600 hover:underline"
        >
          ← Prev
        </button>
        <span className="text-gray-700">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="text-blue-600 hover:underline"
          disabled={todos.length < 3}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
