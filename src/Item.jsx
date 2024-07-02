const Item = (props) => {
  let item = props.item;
  return (
    <div className="shoppingItem">
      <span>{item.name}</span><span>${item.price}</span><span>({item.category})</span>
    </div>
  )
}

export default Item;