import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import { currentFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import CartItem from "./CartItem";
export default function Cart() {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserProgressContext);
  const cartTotal = cartContext.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  function closeCart() {
    userContext.hideCart();
  }
  function increaseItem(item){
    cartContext.addItem(item)
  }
  function decreaseItem(id){
    cartContext.removeItem(id)
  }
  function openCheckout(){
    userContext.showCheckout()
  }
  return (
    <Modal className="cart" open={userContext.progress === "cart"} onClose={userContext.progress === "cart" ? closeCart:null}>
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItem key={item.id} item={item} onIncrease={()=>increaseItem(item)} onDecrease={()=>decreaseItem(item.id)}></CartItem>
        ))}
      </ul>
      <p className="cart-total">{currentFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={closeCart}>
          Close
        </Button>
        {cartContext.items.length !== 0 &&  <Button onClick={openCheckout} >Go to CheckOut</Button>}
       
      </p>
    </Modal>
  );
}
