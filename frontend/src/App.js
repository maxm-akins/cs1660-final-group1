import './App.css';
import Landing from './views/Landing.js';
import Content from './views/Content.js';
import { AuthProvider, useAuth } from "./functions/auth";

import React, { useState, useContext, createContext } from "react";


const App = () => {
  const { user } = useAuth();

  return user ? <Content /> : <Landing />;
};

const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Root;
