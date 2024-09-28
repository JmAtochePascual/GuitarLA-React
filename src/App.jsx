import { useEffect, useState } from "react"

import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./db/db"

function App() {
  const [cart, setCart] = useState([]);

  // Increase the number of items in the cart, the maximum quantity is 5
  const increaseQuantity = (id) => {
    const item = cart.find(item => item.id === id);
    if (item.quantity === 5) return;

    const newCart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
    setCart(newCart);
  }

  // Decrease the number of items in the cart, if the quantity is 1, the item is removed
  const decreaseQuantity = (id) => {
    const item = cart.find(item => item.id === id);
    if (item.quantity === 1) {
      deleteItem(id);
      return;
    }

    const newCart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
    setCart(newCart);
  }

  // Delete item from cart
  const deleteItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  }

  // Add to cart or increase quantity
  const addToCart = (guitar) => {
    const item = cart.find(item => item.id === guitar.id);
    if (item) {
      increaseQuantity(guitar.id);
      return;
    }

    setCart([...cart, { ...guitar, quantity: 1 }]);
  }

  return (
    <>
      <Header
        cart={cart}
        deleteItem={deleteItem}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {
            db.map((guitar) =>
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />
            )
          }
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
