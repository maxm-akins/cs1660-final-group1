import './App.css';
import Landing from './views/Landing.js';
import Content from './views/Content.js';
import { AuthProvider, useAuth } from "./functions/auth";
import React from "react";
import Appbar from "./components/Appbar.js";
import Footer from './components/Footer.js';


const App = () => {
  const { user } = useAuth();

  return user ? <Content /> : <Landing />;
};

const Root = () => (
  <AuthProvider>
    <Appbar />
    <App />
    <Footer />
  </AuthProvider>
);

export default Root;

