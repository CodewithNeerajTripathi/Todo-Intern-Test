const express = require('express');
const multer = require('multer');
const router = express.Router();
const Todo = require('../models/Todo');

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique name
  }
});

const upload = multer({ storage });

// Create Todo with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const todo = new Todo({ title, description, image: imagePath });
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Update Todo with optional image
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, removeImage } = req.body;
    const updateFields = { title, description };

    if (req.file) {
      updateFields.image = `/uploads/${req.file.filename}`;
    } else if (removeImage === 'true') {
      updateFields.image = null; // 👈 remove image
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});


// Delete
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Get Todos
router.get('/', async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  const todos = await Todo.find()
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(todos);
});

// Get One
router.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

module.exports = router;
