import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, []);

  const filterBooksByAvailability = async (avail) => {
    try {
      const response = await axios.get(`http://localhost:3001/books/avail/${avail}`);
      setFilteredBooks(response.data);
      setAvailabilityFilter(avail);
    } catch (error) {
      console.error('Error fetching books by availability:', error);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/books');
      setFilteredBooks(response.data);
      setAvailabilityFilter('');
    } catch (error) {
      console.error('Error fetching all books:', error);
    }
  };

  const getButtonText = (avail) => {
    return avail ? 'Check Out' : 'Check In';
  };

  const handleButtonClick = async (id, avail) => {
    try {
      const updatedAvail = !avail; // Toggle the availability
      const response = await axios.put(`http://localhost:3001/books/${id}`, { avail: updatedAvail });
      console.log(response.data.message); // Log the success message
      // Refetch the books after the update
      if (availabilityFilter !== '') {
        filterBooksByAvailability(availabilityFilter);
      } else {
        fetchAllBooks();
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Library Books</h1>
        <nav className="navbar">
          <a href="#" onClick={() => fetchAllBooks()} className={availabilityFilter === '' ? 'active' : ''}>All Books</a>
          <a href="#" onClick={() => filterBooksByAvailability(true)} className={availabilityFilter === 'true' ? 'active' : ''}>Available Books</a>
          <a href="#" onClick={() => filterBooksByAvailability(false)} className={availabilityFilter === 'false' ? 'active' : ''}>Unavailable Books</a>
        </nav>
      </header>
      <div className="book-list">
      {filteredBooks.map((book) => (
        <div key={book._id} className="card">
          <div className="book">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Publisher: {book.publisher}</p>
            <p>{book.avail ? 'Available' : 'Not Available'}</p>
            <button onClick={() => handleButtonClick(book.id, book.avail)}>{getButtonText(book.avail)}</button>
          </div>
        </div>
      ))}
        {availabilityFilter && filteredBooks.length === 0 && (
          <p>No {availabilityFilter === 'true' ? 'available' : 'unavailable'} books found.</p>
        )}
      </div>
    </div>
  );  
}

export default App;
