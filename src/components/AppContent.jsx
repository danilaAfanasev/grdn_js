import React from 'react';
import BookList from './BookList';
import Filter from './Filter';
import Sort from './Sort';
import Search from './Search';
import BookStats from './BookStats';
import BookForm from './BookForm';
import '../styles/main.scss';

const AppContent = ({ isModalOpen, openModal, closeModal }) => {
  return (
    <div className="app-content">
      <header className="app-header">
        <h1>Моя библиотека</h1>
        <button className="add-book-button" onClick={openModal}>Добавить книгу</button>
      </header>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Добавить книгу</h2>
              <span className="close" onClick={closeModal}>&times;</span>
            </div>
            <BookForm onClose={closeModal} />
          </div>
        </div>
      )}
      <main className="app-main">
        <div className="controls">
          <Filter />
          <Sort />
          <Search />
        </div>
        <BookStats />
        <BookList />
      </main>
    </div>
  );
};

export default AppContent;
