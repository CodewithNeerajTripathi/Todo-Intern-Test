import TodoEditClient from '../../components/TodoEditClient';

// ✅ REQUIRED for `output: export`
export async function generateStaticParams() {
  const res = await fetch('https://neeraj-project.onrender.com/api/todos');
  const todos = await res.json();

  return todos.map((todo) => ({
    id: todo._id,
  }));
}

export default async function TodoDetail({ params }) {
  const { id } = params;

  const res = await fetch(`https://neeraj-project.onrender.com/api/todos/${id}`);
  const todo = await res.json();

  return (
    <div className="max-w-2xl bg-[#2e2e67] rounded-lg mx-auto px-4 py-8">
      <h2 className="text-2xl text-white font-bold mb-6">Edit Post</h2>
      {/* Editable client-side component */}
      <TodoEditClient todo={todo} />
    </div>
  );
}