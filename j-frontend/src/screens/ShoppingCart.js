import React, { useEffect, useState , useContext } from "react";
import { Context as CartContext } from "../context/CartContext";

const ShoppingCartPage = () => {

    const {state : cart} = useContext(CartContext);

    const [cartItems,setCartItems] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);

    useEffect(() => {
        const updatedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    }, [cart.cartItems]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCart);
        calculateTotalPrice(storedCart);
    }, []);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const handleIncreaseQuantity = (item) => {
        const updatedCart = cartItems.map((cartItem) =>
            cartItem.pid === item.pid ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        calculateTotalPrice(updatedCart);
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            const updatedCart = cartItems.map((cartItem) =>
            cartItem.pid === item.pid ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            );
            setCartItems(updatedCart);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            calculateTotalPrice(updatedCart);
        }
    };

    const handleRemoveItem = (item) => {
        const updatedCart = cartItems.filter((cartItem) => cartItem.pid !== item.pid);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        calculateTotalPrice(updatedCart);
    };

    const handleClearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cartItems");
        setTotalPrice(0);
    }

    return (
    <div className="container mt-4">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
        ) : (
        <div>
            <div className="list-group">
            {cartItems.map((item) => (
                <div key={item.pid} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img
                    src={JSON.parse(item.images)[0]} 
                    alt={item.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "1rem" }}
                    />
                    <div>
                    <h6>{item.name}</h6>
                    <p className="text-muted">Price: ${item.price}</p>
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    {/* Quantity controls */}
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleDecreaseQuantity(item)}
                        disabled={item.quantity <= 1} // Disable if quantity is 1
                    >
                        -
                    </button>
                    <span className="mx-2">Qty: {item.quantity}</span>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleIncreaseQuantity(item)}
                    >
                        +
                    </button>

                    <span className="fw-semibold ms-3">Total: ${item.price * item.quantity}</span>

                    {/* Remove button */}
                    <button
                        className="btn btn-sm btn-danger ms-3"
                        onClick={() => handleRemoveItem(item)}
                    >
                        Remove
                    </button>
                    </div>
                </div>
            ))}
            </div>

            <div className="mt-4 d-flex justify-content-between align-items-center">
            <h4>Total Price: ${totalPrice}</h4>
            <div>
                <button
                className="btn btn-danger"
                onClick={handleClearCart}
                >
                Clear Cart
                </button>
                <button className="btn btn-primary ms-3">Checkout</button>
            </div>
            </div>
        </div>
        )}
    </div>
    );
};

export default ShoppingCartPage;