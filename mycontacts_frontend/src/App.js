import './App.css';
// import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //     console.log(accessToken);
  //     if (accessToken) {
  //       setIsLoggedIn(true);
  //     }
  // }, []);

  // const handleLogout = (e) => { 
  //   e.preventDefault();
  //   localStorage.removeItem("accessToken");
  //   setIsLoggedIn(false);
  // };

  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
