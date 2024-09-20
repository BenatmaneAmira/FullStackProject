const Book = require('../Models/Book');
const getBooks = async (req, res) => {
  try {
    const { title, author, category } = req.query;
    const filters = {};

    if (title) filters.title = new RegExp(title, 'i');
    if (author) filters.author = new RegExp(author, 'i');
    if (category) filters.category = new RegExp(category, 'i');

    const books = await Book.find(filters);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un nouveau livre (admin uniquement)
const addBook = async (req, res) => {
  try {
    const { title, author, category, publicationDate, summary, coverImage } = req.body;
    const book = new Book({ title, author, category, publicationDate, summary, coverImage });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Modifier un livre (admin uniquement)
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const book = await Book.findByIdAndUpdate(id, updates, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un livre (admin uniquement)
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Liker ou unliker un livre (user)
const likeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Liker ou unliker
    const liked = req.user.likedBooks.includes(id);
    if (liked) {
      req.user.likedBooks = req.user.likedBooks.filter((bookId) => bookId.toString() !== id.toString());
      book.likes -= 1;
    } else {
      req.user.likedBooks.push(id);
      book.likes += 1;
    }

    await req.user.save();
    await book.save();

    res.json({ message: liked ? 'Book unliked' : 'Book liked', likes: book.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getBooks, addBook, updateBook, deleteBook, likeBook };
