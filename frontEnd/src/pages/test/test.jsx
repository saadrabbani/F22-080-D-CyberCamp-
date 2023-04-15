import React, { useState } from "react";

function ListWithDeleteButton() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
      <h2>List with Delete Button</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListWithDeleteButton;
