import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import CheckOut from "./components/Checkout.jsx";
function App() {
  return (
    <main>
      <CartContextProvider>
        <UserProgressContextProvider>
          <Header></Header>
          <Meals></Meals>
          <Cart/>
          <CheckOut></CheckOut>
        </UserProgressContextProvider>
      </CartContextProvider>
    </main>
  );
}

export default App;
