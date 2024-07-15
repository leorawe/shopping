import './App.css';
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Item from './Item';
import { useFormik } from 'formik';

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
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const formik = useFormik({
    initialValues: {
      category: '',
      price: '',
      name: '',
      id: uuidv4()
    },
    onSubmit: values => {
      try {
        if (values.name != '') {
          // Check for duplicates.
          if (checkDuplicates(values)) {
            values.id = uuidv4();
            let newProduce = produce.concat(values);
            const sortedNewProduce = newProduce.sort(customSort);
            console.log(sortedNewProduce)
            setProduce(sortedNewProduce);
          }
          else {
            alert('duplicate ' + values.name);
          }
        }
      } catch (event) {
        alert(`Failed! ${event.message}`);
      }
    },
  });

  const customSort = (a, b) => {
    if (a.price === b.price) {
      return ((a.name || "").localeCompare(b.name || ""))
    }
    else {
      return (a.price - b.price)
    }
  }
  const sortedProduce = fruitsVegetables.sort(customSort);
  const [produce, setProduce] = useState(sortedProduce);

  const removeItem = (i) => {
    const updatedList = produce.filter((item) => item.id !== i.id);
    setProduce(updatedList);
  }

  const checkDuplicates = (i) => {
    let noDup = true;
    produce.map((existingItem) => {
      if (existingItem.name === i.name) {
        noDup = false;
      }
    });
    return noDup;
  }

  return (
    <div className="App">
      <header>
        <h1>
          Shopping List
        </h1>
      </header>
      <div className="formSection">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              id="name"
              name="name"
              value={formik.values.name}
              type="text"
              onChange={formik.handleChange}
            />
          </label>
          <label htmlFor="category">
            Category:
            <select onChange={formik.handleChange} name="category" value={formik.values.category} type="text">
              <option value='' key='50'>--Choose an option--</option>
              <option value="Vegetables" key='51'>Vegetable</option>
              <option value="Fruits" key='52'>Fruit</option>
            </select>
          </label>
          <label htmlFor="price">
            Price:
            <input
              id="price"
              name="price"
              type="number"
              required min="1"
              value={formik.values.price}
              onChange={formik.handleChange}
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
