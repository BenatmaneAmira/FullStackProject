// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getProfile, getLikedBooks , getCurrentUser , getAllUsers ,deleteUser  } = require('../Controllers/userController');
const { protect ,  admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.get('/liked-books', protect, getLikedBooks);
router.get('/current-user', protect, getCurrentUser); 
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);
module.exports = router;
