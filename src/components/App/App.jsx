import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import './App.css';


function App() {
    useEffect(() => {
        getItems();
      }, [])

      const [shoppingList, setShoppingList] = useState([]);
  
      const  getItems= () => {
        axios({
          method: 'GET',
          url: '/list'
        }).then((response) => {
          console.log(response.data);
          setShoppingList(response.data);
        }).catch((error) => {
          console.log('GET /shopping list broke:', error);
        })
      }

    return (
        <div className="App">
            <Header />
            <main>
                <p>Under Construction...</p>
            </main>
        </div>
    );
}

export default App;
