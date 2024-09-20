
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Inscription d'un nouvel utilisateur
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion de l'utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupération des informations de profil
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer la liste des livres likés par l'utilisateur
const getLikedBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('likedBooks');
    res.json(user.likedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Récupération de l'utilisateur connecté
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Ne pas renvoyer le mot de passe
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  const { search, sort } = req.query;
  try {
    const searchCriteria = search
      ? {
          $or: [
            { username: new RegExp(search, 'i') },
            { email: new RegExp(search, 'i') },
          ],
        }
      : {};

    const sortCriteria = sort
      ? { [sort]: 1 }
      : { createdAt: -1 }; // Par défaut, trier par date de création

    const users = await User.find(searchCriteria).sort(sortCriteria);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un utilisateur (Admin uniquement)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);  // Ajoutez ceci pour capturer l'erreur
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = { registerUser, loginUser, getProfile, getLikedBooks, getCurrentUser, getAllUsers, deleteUser };
