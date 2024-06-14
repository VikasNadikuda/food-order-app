import { useContext } from "react";
import { currentFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
export default function MenuItem({ meal }) {
    const cartContext= useContext(CartContext)
    function handleAddItemtoCart(){
        cartContext.addItem(meal)
    }
  return (
    <li className="meal-item" key={meal.id}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price ">{currentFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions ">
            <Button onClick={handleAddItemtoCart}>Add to Cart</Button>
          {/* <button>Add to Cart</button> */}
        </p>
      </article>
    </li>
  );
}
