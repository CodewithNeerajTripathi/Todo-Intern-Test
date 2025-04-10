'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TodoList() {
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
    <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>📰 Latest Posts</h1>

      {todos.map((todo) => (
        <div key={todo._id} style={{
          marginBottom: '3rem',
          borderBottom: '1px solid #ccc',
          paddingBottom: '2rem'
        }}>
          <h2>{todo.title}</h2>
          <p style={{ fontSize: '16px' }}>{todo.description}</p>
          <small style={{ color: 'gray' }}>{new Date(todo.date).toLocaleString()}</small>

          <div style={{ marginTop: '1rem' }}>
            <Link href={`/todos/${todo._id}`}>
              <button style={{
                background: '#3182ce',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                marginRight: '10px',
                cursor: 'pointer'
              }}>
                 Edit
              </button>
            </Link>
            <button
              onClick={() => deleteTodo(todo._id)}
              style={{
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
               Delete
            </button>
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>← Prev</button>
        <span style={{ margin: '0 1rem' }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={todos.length < 3}>Next →</button>
      </div>
    </div>
  );
}
