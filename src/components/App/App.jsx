import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import './App.css';


function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <p>Under Construction...</p>
            </main>
        </div>
    );
}

const addItem = (e) => {
    e.preventDefault();
    let newItem = {
      name: name,
      quantity: quantity,
      unit: unit
    }
    axios({
      method: 'POST',
      url: '/people',
      data: newItem
    }).then((response) => {
     getItems();
    }).catch((error) => {
      console.log('POST /list broke:', error);
    })
  
  }

export default App;
