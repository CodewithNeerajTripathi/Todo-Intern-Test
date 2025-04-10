const mongoose = require('mongoose');
require('dotenv').config();

const Todo = require('./models/Todo');

// Sample todos to insert
const sampleTodos = [
  {
    title: 'Learn Next.js',
    description: 'Start with the official Next.js tutorial.',
  },
  {
    title: 'Build Todo App',
    description: 'Use Express for backend and Next.js for frontend.',
  },
  {
    title: 'Test Pagination',
    description: 'Make sure todos list supports page navigation.',
  },
];

// Connect and insert
async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Todo.deleteMany(); // clear existing todos (optional)
    await Todo.insertMany(sampleTodos);
    console.log('✅ Sample todos added');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
    process.exit(1);
  }
}

seedData();
