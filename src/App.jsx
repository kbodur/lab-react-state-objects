import Footer from "./Footer";
import Header from "./Header";
import React, { useState } from "react"
import menuItems from "./data"

function App() {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [totalCost, setTotalCost] = useState(0);


  const addToOrder = (item) => {
    setCurrentOrder([...currentOrder, item]);
    setTotalCost(totalCost + item.price);
  };


  const clearOrder = () => {
    setCurrentOrder([]);
    setTotalCost(0);
  };

  const tidyOrder = () => {

    const tidiedOrder = [];
    currentOrder.forEach((item) => {
      const existingItemIndex = tidiedOrder.findIndex(
        (tidiedItem) => tidiedItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        tidiedOrder[existingItemIndex].quantity++;
      } else {
        tidiedOrder.push({ ...item, quantity: 1 });
      }
      document.getElementById("xxx").style.opacity = "1"
    });
    setCurrentOrder(tidiedOrder);
    const newTotalCost = tidiedOrder.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalCost(newTotalCost);

  };

  const removeFromOrder = (index) => {
    const itemToRemove = currentOrder[index];
    const newOrder = currentOrder.filter((item, i) => i !== index);
    setCurrentOrder(newOrder);
    setTotalCost(totalCost - itemToRemove.price);
  };


  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} onClick={() => addToOrder(item)}>
                  <td>{item.image}</td>
                  <td className="item-name">
                    <span>{item.name}</span> <br />
                    <span>{"🌶️".repeat(item.spiceLevel)}</span>
                  </td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
              {currentOrder.map((item, index) => (
                <li key={index}>
                  <button className="x" onClick={() => removeFromOrder(index)}>❌</button>
                  <p>{item.name}</p>
                  <p> ${item.price} <span id="xxx">x</span> {item.quantity}</p>


                </li>
              ))}
            </ul>
            <h4>Total:${totalCost}</h4>
            <div>
              <button className="tidy" onClick={tidyOrder}>Tidy order</button>
              <button onClick={clearOrder}>Close order</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
