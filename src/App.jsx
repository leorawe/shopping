import './App.css';
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Item from './Item'

const fruitsVegetables =
  [
    {
      category: 'Fruit',
      price: '3',
      name: 'Watermelon',
      id: 809
    },
    { category: "Fruits", price: "1", name: "Apple", id: 1 },
    { category: "Fruits", price: "1", name: "Dragonfruit", id: 2 },
    { category: "Fruits", price: "2", name: "Passionfruit", id: 3 },
    { category: "Vegetables", price: "2", name: "Spinach", id: 4 },
    { category: "Vegetables", price: "4", name: "Pumpkin", id: 5 },
    { category: "Vegetables", price: "1", name: "Peas", id: 6 }
  ]

const blankProduce = {
  category: '',
  price: '',
  name: '',
  id: uuidv4()
}

function App() {
  const [item, setItem] = useState(blankProduce);
  const sortedProduce = fruitsVegetables.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  const [produce, setProduce] = useState(sortedProduce);
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
      if (item.name != '') {
        item.id = uuidv4();
        let newProduce = produce.concat(item);
        const sortedNewProduce = newProduce.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        setProduce(sortedNewProduce);
      }
      setItem(
        {
          category: '',
          price: '',
          name: '',
          id: uuidv4()
        }
      )
    } catch (event) {
      alert(`Failed! ${event.message}`);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>
          Shopping List
        </h1>
      </header>
      <div className="formSection">
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input
              value={item.name}
              type="text"
              onChange={set('name')}
            />
          </label>
          <label>
            Category:
            <select onChange={set('category')} value={item.category}>
              <option value='' key='50'>--Choose an option--</option>
              <option value="Vegetables" key='51'>Vegetable</option>
              <option value="Fruits" key='52'>Fruit</option>
            </select>
          </label>
          <label>
            Price:
            <input
              type="number"
              required min="1"
              value={item.price}
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
