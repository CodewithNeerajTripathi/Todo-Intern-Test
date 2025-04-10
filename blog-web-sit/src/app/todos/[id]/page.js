'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function TodoDetail() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`);
      const data = await res.json();
      if (res.ok) setTodo(data);
      else alert('Failed to load post');
    };

    if (id) fetchTodo();
  }, [id]);

  const handleSave = async () => {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
      }),
    });

    if (res.ok) {
      setStatus('✅ Post updated');
      setTimeout(() => setStatus(''), 2000);
    } else {
      alert('❌ Update failed');
    }
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>Edit Post</h2>

      <input
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />

      <textarea
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        rows={6}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />

      <button onClick={handleSave} style={{
        background: '#38a169',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Save Changes
      </button>

      {status && <p style={{ color: 'green', marginTop: 10 }}>{status}</p>}
    </div>
  );
}
