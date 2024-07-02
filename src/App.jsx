import './App.css';
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Item from './Item'

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

const fruitsVegetables =
  [
    { category: "Fruits", price: "1", name: "Apple", id: 1 },
    { category: "Fruits", price: "1", name: "Dragonfruit", id: 2 },
    { category: "Fruits", price: "2", name: "Passionfruit", id: 3 },
    { category: "Vegetables", price: "2", name: "Spinach", id: 4 },
    { category: "Vegetables", price: "4", name: "Pumpkin", id: 5 },
    { category: "Vegetables", price: "1", name: "Peas", id: 6 }
  ]

const watermelon = {
  category: 'Fruit',
  price: '3',
  name: 'Watermelon',
  id: 809
}

function App() {

  const [shopData, setShopData] = useState(shoppingItems);
  const [name, setName] = React.useState('');
  const [item, setItem] = useState(watermelon);
  const [produce, setProduce] = useState(fruitsVegetables);


  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    // add item
    const newList = shopData.concat({ name, price, category, id: uuidv4() });
    const sortedNewList = newList.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    setShopData(sortedNewList);
  }

  const set = name => {
    return ({ target: { value } }) => {
      setItem(oldValues => ({ ...oldValues, [name]: value }));
    }
  };

  const removeItem = (i) => {
    const updatedList = produce.filter((item) => item.id !== i.id);
    setProduce(updatedList);
  }

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      item.id = uuidv4();
      let newProduce = produce.concat(item);
      const sortedNewProduce = newProduce.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      setProduce(sortedNewProduce);
    } catch (e) {
      alert(`Failed! ${e.message}`);
    }
  }

  // Ensuring the key isn't a falsy value, or has null or undefined type.
  const sortedItems = shopData.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  // const sortedProduce = produce.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  useEffect(() => {
    setProduce[{ ...produce }];
    let newProd = produce.concat(item);
    setProduce(newProd);
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
      <hr />
      <div className="formSection">
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input
              type="text"
              onChange={set('name')}
            />
          </label>
          <label>
            Category:
            <select onChange={set('category')}>
              <option value="" key='50'>--Choose an option--</option>
              <option value="Vegetables" key='51'>Vegetable</option>
              <option value="Fruits" key='52'>Fruit</option>
            </select>
          </label>
          <label>
            Price:
            <input type="number" required min="1"
              onChange={set('price')}
            />
          </label>
          <button type="submit" >
            Add Produce
          </button>
        </form>
      </div>
      {produce.length > 0 ?
        <ul>
          {produce.map((item) => (
            <li key={item.id}>
              <Item item={item}></Item>
              <button
                type="button"
                onClick={() => removeItem(item)}>x</button>
            </li>
          ))}
        </ul>
        : null
      }
    </div >
  );
}

export default App;
