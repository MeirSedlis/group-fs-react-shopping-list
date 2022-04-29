import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx'
import './App.css';
import ItemForm from '../ItemForm/ItemForm.jsx';




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

      const addItem = (newItem) => {
        
        axios({
          method: 'POST',
          url: '/list',
          data: newItem
        }).then((response) => {
         getItems();
        }).catch((error) => {
          console.log('POST /list broke:', error);
        })
      
      }

      const updateItem = (e) => {
          e.preventDefault();
          console.log('this will update!');
          
      }

      const deleteItem = (e) => {
        e.preventDefault();
        console.log('this will delete!');
    }

    return (
        <div className="App">
            <Header />
            <main>
                <p>Under Construction...</p>
                <>
                <ItemForm addItem={addItem} />
                </>
                <ul>
                {shoppingList.map((item) => {
                return (
                    <form key = {item.id}>
                        <li>{item.name}, {item.quantity} {item.unit}</li>
                        <button onClick = {updateItem}>Buy</button>
                        <button onClick = {deleteItem}>Remove</button>
                    </form>
                    )
                })}
                </ul>
               
            </main>
        </div>
    );
}



export default App;
