import './App.css';
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const shoppingItems = [
  {
    id: 'a',
    name: 'pepper',
  },
  {
    id: 'b',
    name: 'broccoli',
  },
  {
    id: 'c',
    name: 'onions',
  },
  {
    id: 'd',
    name: 'cream',
  },
]

function App() {

  const [shopData, setShopData] = useState(shoppingItems);
  const [name, setName] = React.useState('');


  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    // add item
    const newList = shopData.concat({ name, id: uuidv4() });
    const sortedNewList = newList.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    setShopData(sortedNewList);
  }

  // Ensuring the key isn't a falsy value, or has null or undefined type.
  const sortedItems = shopData.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  useEffect(() => {

    setShopData(sortedItems);
  }, [sortedItems]);

  return (
    <div className="App">
      <header>
        <h1>
          Shopping List
        </h1>
      </header>
      <div>
        <input type="text" onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul>
        {shopData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
