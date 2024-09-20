import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomeBook from './pages/HomeBook/HomeBook';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import  AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import UserListPage from './pages/UserListPage/UserListPage';
import Footer from './Components/Footer/Footer';
import About from './pages/About/About';
import Terms from './pages/Terms/Terms';
import Contact from './pages/Contact/Contact';
import './App.css'
function App() {
 
  return (
    <Router>
       <div className="App">
         <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomeBook />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={< AdminDashboard/>} />
        <Route path="/userlist" element={<  UserListPage/>} />
        <Route path="/about" element={<  About/>} />
        <Route path="/terms" element={<  Terms/>} />
        <Route path="/contact" element={<  Contact/>} />
      </Routes>
     <Footer/>
      </div>
     
      
    </Router>
    
    
      
  );
}

export default App;
