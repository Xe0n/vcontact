import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Contact from './pages/Contact';
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import MainLayout from './layouts/MainLayouts';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='contact/:id' element={<Contact />} />
          <Route path='new-contact' element={<AddContact />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
