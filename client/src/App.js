import './App.css';
import React from "react";
import io from "socket.io-client"
import { BrowserRouter as Router, Route, Routes, Redirect, Link } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LanguagesPage from './pages/LanguagesPage';

const socket = io("http://localhost:3001", { transports: ["websocket", "polling", "flashsocket"] });


function App() {
  // const [user, setUser] = React.useState(null);

  // const login = () => {
  //   socket.emit()
  // };

  // React.useEffect(() => {
    
  // }, [socket]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/languages" element={<LanguagesPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
