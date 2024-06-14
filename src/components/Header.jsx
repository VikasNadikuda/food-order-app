import LOGO from "../assets/logo.jpg"
import Button from "./UI/Button"
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header(){
    const cartContext=useContext(CartContext)
    const userContext= useContext(UserProgressContext)
    const cartLength= cartContext.items.reduce((totalItems,item)=>{
      return item.quantity+totalItems
    },0)
    function handleShowCart(){
        userContext.showCart()
    }
    return (
        <header id="main-header">
            <div id="title">
                <img src={LOGO} alt="This is the main logo of app" />
                <h1>OrderFood Now</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({cartLength})</Button>
                {/* <button>Cart (0)</button> */}
            </nav>
        </header>
    )
}