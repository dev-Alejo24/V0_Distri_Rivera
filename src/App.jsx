import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Importar el proveedor
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/Routes';
import 'bootstrap-icons/font/bootstrap-icons.css';

const clientId = '280023233018-dlrh46gjnq2pfa4o5hu43b4u7k7enm6d.apps.googleusercontent.com'; // Tu Client ID

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}> {/* Envolver la aplicación con el proveedor */}
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
