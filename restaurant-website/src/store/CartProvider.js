import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const newItems = [...items];
  let total = 0;
  console.log(items)


  function addItemToCartHandler(item,quantity) {
    let isItemAdded = false;
    newItems.forEach((element) => {
      if (element.id === item.id) {
        isItemAdded = true;
        element.quantity = Number(element.quantity) + Number(quantity);
      }
    });

    if (!isItemAdded) {
      newItems.push({...item,quantity});
    }

    setItems(newItems);
  }

  const removeItemToCartHandler = (item) => {
    newItems.forEach((element) => {
      if (element.id === item.id) {
        if (element.quantity > 0) {
          element.quantity = element.quantity - Number(1);
        }
      }
    });
    setItems(newItems);
    items.map((item) => {
      total = total - (item.price * item.quantity);
      return total;
    });
     
  };

  items.map((item) => {
    total = total+item.price * item.quantity;
    return total;
  });
  const cartContext = {
    items: items,
    totalAmount: total.toFixed(2),
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;