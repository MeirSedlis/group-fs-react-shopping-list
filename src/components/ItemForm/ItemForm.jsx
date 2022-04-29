import { useState } from 'react';

function ItemForm({addItem}) {
  const [itemInput, setItemInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [unitInput, setUnitInput] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    let theNewItem = {
      name: itemInput,
      quantity: quantityInput,
      unit: unitInput
    }
    addItem(theNewItem);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={itemInput}
        onChange={(e) => { setItemInput(e.target.value) }}
        placeholder="item name" />
      <input
        value={quantityInput}
        onChange={(e) => { setQuantityInput(e.target.value) }}
        placeholder="quantity" />
      <input
        value={unitInput}
        onChange={(e) => { setUnitInput(e.target.value) }}
        placeholder="unit" />
      <button>Submit</button>
    </form>
  )
}

export default ItemForm;