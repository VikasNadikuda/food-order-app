import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currentFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHTTP";
import Error from "./Error";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckOut() {
  const userContext = useContext(UserProgressContext);
  const cartContext = useContext(CartContext);
  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    config
  );

  const cartTotal = cartContext.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  function closeCheckout() {
    userContext.hideCheckout();
  }

  function handleFinish() {
    userContext.hideCheckout();
    cartContext.clearItem();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const userData = Object.fromEntries(fd.entries());
    console.log('Submitting order with data:', userData);
    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: userData,
        },
      })
    );
  }

  if (data && !error) {
    return (
      <Modal open={userContext.progress === "checkout"} onClose={handleFinish}>
        <h2>Success</h2>
        <p>Your order has been submitted</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userContext.progress === "checkout"} onClose={closeCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currentFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="number" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">
          {isLoading && <span>Sending order data...</span>}
          {!isLoading && (
            <>
              <Button type="button" textOnly onClick={closeCheckout}>
                Close
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
}
