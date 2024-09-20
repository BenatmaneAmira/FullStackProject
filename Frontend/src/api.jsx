import axios from 'axios';

const API_URL = 'http://localhost:7000/api/books';

// Fonction pour récupérer le token du localStorage (ou autre)
const getAuthToken = () => {
  return localStorage.getItem('token'); // Assurez-vous que le token est stocké sous 'token'
};

export const getBooks = async (filters) => {
  const token = getAuthToken();
  
  // Envoyer les filtres dans la requête en utilisant axios.get avec params
  const response = await axios.get(API_URL, {
    params: filters, // Passer les filtres ici
    headers: {
      'Authorization': `Bearer ${token}`, // Inclure le token ici
    }
  });
  
  return response.data;
};

// Mettre à jour un livre
export const updateBook = async (id, updatedBook) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${API_URL}/${id}`, 
    updatedBook, 
    {
      headers: {
        'Authorization': `Bearer ${token}`, // Inclure le token ici
      }
    }
  );
  return response.data;
};

// Supprimer un livre
export const deleteBook = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(
    `${API_URL}/${id}`, 
    {
      headers: {
        'Authorization': `Bearer ${token}`, // Inclure le token ici
      }
    }
  );
  return response.data;
};

// Ajouter un livre (si vous en avez besoin pour l'API d'ajout)
export const addBook = async (newBook) => {
  const token = getAuthToken();
  const response = await axios.post(
    API_URL, 
    newBook, 
    {
      headers: {
        'Authorization': `Bearer ${token}`, // Inclure le token ici
      }
    }
  );
  return response.data;
};
