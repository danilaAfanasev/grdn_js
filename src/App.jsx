import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppContent from './components/AppContent';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Provider store={store}>
      <AppContent isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
    </Provider>
  );
};

export default App;
