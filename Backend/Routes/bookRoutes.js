
const express = require('express');
const router = express.Router();
const { getBooks, addBook, updateBook, deleteBook, likeBook } = require('../Controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');
 // Middleware pour authentification et vérification du rôle admin

//Récupérer tous les livres avec options de filtrage
router.get('/', getBooks);
//(admin uniquement)
router.post('/', protect, admin, addBook); // S'assurer que protect, admin, et addBook sont définis
router.put('/:id', protect, admin, updateBook);
router.delete('/:id', protect, admin, deleteBook);
//Liker ou unliker un livre (user)
router.post('/:id/like', protect, likeBook);

module.exports = router;
