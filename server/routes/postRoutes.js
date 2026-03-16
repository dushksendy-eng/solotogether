const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPost, toggleLike, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', protect, createPost);
router.put('/:id/like', protect, toggleLike);
router.delete('/:id', protect, deletePost);

module.exports = router;