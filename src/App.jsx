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

  function handleNameChange(e) {
    setItem({
      ...item,
      name: e.target.value
    });
  }

  function handlePriceChange(e) {
    setItem({
      ...item,
      price: e.target.value
    });
  }

  function handleCatChange(e) {
    setItem({
      ...item,
      category: e.target.value
    });
  }

  function handleAdd() {
    // add item
    const newList = shopData.concat({ name, price, category, id: uuidv4() });
    const sortedNewList = newList.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    setShopData(sortedNewList);
  }

  function handleProduceAdd() {
    // add item
    item.id = uuidv4();
    // console.log('item', item)
    // let newProduce = [{ ...produce }];
    // newProduce.push([item]);
    let newProduce = produce.concat(item);
    // console.log('shoppping newProduce', newProduce)
    const sortedNewProduce = newProduce.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    setProduce(sortedNewProduce);
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
        <label>
          Name:
          <input
            type="text"
            onChange={handleNameChange}
          />
        </label>
        <label>
          Category:
          <select onChange={handleCatChange}>
            <option value="" key='50'>--Choose an option--</option>
            <option value="Vegetables" key='51'>Vegetable</option>
            <option value="Fruits" key='52'>Fruit</option>
          </select>
        </label>
        <label>
          Price:
          <input
            onChange={handlePriceChange}
          />
        </label>
      </div>
      <button type="button" onClick={handleProduceAdd}>
        Add Produce
      </button>
      <div>{item.name}, {item.price}</div>
      <ul>
        {produce.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
