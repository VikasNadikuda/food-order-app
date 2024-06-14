import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItem: () => {},
});
function cartReducer(state, action) {
  if (action.type == "ADD_ITEM") {
    const checkExistingIndex = state.items.findIndex(
      (item) => action.item.id === item.id
    );
    const updatedItems = [...state.items];
    if (checkExistingIndex > -1) {
      const updatedItem = {
        ...state.items[checkExistingIndex],
        quantity: state.items[checkExistingIndex].quantity + 1,
      };
      updatedItems[checkExistingIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
    // state.items.push(action.item)  ///never mutate existing state like this because push will edit existing items array might change value before cartReducer is executed
  } else if (action.type == "REMOVE_ITEM") {
    const checkExistingIndex = state.items.findIndex(
      (item) => action.id === item.id
    );
    const existingCartItem = state.items[checkExistingIndex];
    const prevState = [...state.items];
    if (existingCartItem.quantity == 1) {
      prevState.splice(checkExistingIndex, 1);
    } else {
      // prevState[checkExistingIndex].quantity-=1
      const updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      prevState[checkExistingIndex] = updateItem;
    }
    return { ...state, items: prevState };
  }
  if (action.type == "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  }
  function clearItem() {
    dispatchCartAction({
      type: "CLEAR_CART",
    });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearItem
  };
  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
