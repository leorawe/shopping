const Item = (props) => {
  let item = props.item;

  const removeItem = (item) => {
    //removeItem
    console.log('item to remove', item)
  }
  return (
    <div className="shoppingItem">
      <div><span>{item.name}</span><span>${item.price}</span><span>({item.category})</span></div>
      <button type="button" onClick={removeItem(item)}>-</button>
    </div>
  )
}

export default Item;