import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {

    const navigate = useNavigate();

    const [name , setName] = useState("");
    const [address , setAddress] = useState("");
    const [totalPrice , setTotalPrice] = useState(0);

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

    useEffect(() => {
        calculateTotalPrice(cartItems);
    }, []);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const handleSubmit = () => {
        localStorage.removeItem("cartItems");
        alert("Thank you for your order!");
        navigate("/dashboard");
    };

    return(
        <div className="container mt-4">
            <h4>Shopping Cart</h4>
            <div className="row">
                <div className="col-md-6">
                    {cartItems.length === 0 ? (
                        <div className="alert alert-info">Your cart is empty.</div>
                    ) : (
                        <div>
                            <div className="list-group" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                {cartItems.map((item) => (
                                    <div
                                        key={item.pid}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={JSON.parse(item.images)[0]}
                                                alt={item.name}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                    marginRight: "1rem",
                                                }}
                                            />
                                            <div>
                                                <h6>{item.name}</h6>
                                                <p className="text-muted">Price: ${item.price}</p>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center">

                                            <span className="fw-semibold ms-3">
                                                Total: ${item.price * item.quantity}
                                            </span>

                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 d-flex justify-content-between align-items-center">
                                <h4>Total Price: ${totalPrice}</h4>
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-md-6">
                    <h1>Checkout</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Shipping Address
                            </label>
                            <textarea
                                className="form-control"
                                id="address"
                                name="address"
                                rows="3"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;