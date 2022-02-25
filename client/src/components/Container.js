import React, { useState } from 'react';
import NavTabs from './layout/NavTabs';
import Landing from './pages/Landing';
import Main from './pages/Main';
import Profile from './pages/Profile';
import Matches from './pages/Matches';
import Login from './pages/Login';
import Footer from './layout/Footer';

export default function Container() {
  const [currentPage, setCurrentPage] = useState('Home');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'Landing') {
      return <Landing />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
    if (currentPage === 'Matches') {
      return <Matches />;
    }
    if (currentPage === 'Main') {
      return <Main />;
    }
    if (currentPage === 'Login') {
      return <Login />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
      <Footer />
    </div>
  );
}
