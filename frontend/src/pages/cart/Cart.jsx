import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./Cart.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  //this is called on component mount
  useEffect(() => {
    // Retrieve cart data from localStorage
    let localCart = localStorage.getItem("cart");

    if (localCart) localCart = JSON.parse(localCart);

    // Load persisted cart into state if it exists
    if (localCart) setCart(localCart);
  }, []); // The empty array ensures useEffect only runs once

  const handleRemove = () => {
    localStorage.removeItem("cart");
    location.reload();
  };

  if (cart.length <= 0) {
    return (
      <div className="empty-msg">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3613108-3020773.png"
          width="250px"
          alt=""
        />
        <h1>Cart is Empty!</h1>
        <NavLink to="/foods" className="return-shop">
          Return to Shop
        </NavLink>
      </div>
    );
  }

  // Calculate the total price of items in the cart
  const totalPrice = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    return totalAmount;
  };
  const totalAmount = totalPrice();

  // Handle the order submission
  const handleOrder = async () => {
    try {
      // Retrieve the user data (userId and username) from localStorage
      const user = localStorage.getItem("user");
      if (!user) {
        alert("You need to log in before placing an order!");
        return navigate("/login"); // Redirect to login page if user is not logged in
      }

      const parsedUser = JSON.parse(user); // Parse user object from localStorage
      const { _id: userId, name: username } = parsedUser;

      // The cart is already in the state, no need to fetch it again
      const orderedItems = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));
      

      // Prepare the payload to send to the backend
      const payload = {
        userId,  // User ID from localStorage
        username,  // Username from localStorage
        orderedItems,  // Array of ordered items from the cart
        totalAmount  // Total amount calculated in the frontend
      };

      // Send the data to the backend
      const response = await axios.post(
        "https://food-deli-ri6z.vercel.app/api/create-order",
        payload
      );

      if (response.status === 200) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart"); // Clear the cart after successful order
        navigate("/checkout"); // Redirect to checkout page
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="cart-food-list">
      <div className="cart-child">
        <h2 style={{ textAlign: "center" }}>Your Food List...</h2>
        {cart.map((item) => {
          const { name, price, img, id, quantity } = item;
          return (
            <div key={id} className="cart-item">
              <img src={img} alt="" />
              <p className="cart-item-name">{name}</p>
              <p className="cart-price">
                Rs. {price} x {quantity}
              </p>
            </div>
          );
        })}
      </div>
      <div className="subtotal">
        <h2>Subtotal</h2>
        <div className="subtotao-details">
          <p>Total Price : Rs. {totalAmount}</p>
          <hr />
          <p>Final Price : Rs. {totalAmount}</p>
        </div>
        <button className="check-btn" onClick={handleOrder}>
          Order Now
        </button>
        <button onClick={() => navigate("/foods")} className="return-btn">
          Return to shop
        </button>
        <p onClick={() => handleRemove()} className="delete-icon">
          Empty Cart: <DeleteForeverIcon />
        </p>
      </div>
    </div>
  );
};

export default Cart;
