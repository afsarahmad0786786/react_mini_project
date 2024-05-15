import { useState, useEffect } from 'react';
import './style.scss'

const ViewCarts = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(existingCartItems);
    }, []);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleQuantityChange = (index, delta) => {
        const newCartItems = [...cartItems];
        const item = newCartItems[index];
        if (item.quantity + delta > 0) {
            item.quantity += delta;
        }
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    return (
        <div className="cart-container">
            <h1 className="cart-heading">Your Cart</h1>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index} className="cart-item">
                            <td>{index + 1}</td>
                            <td><img style={{ width: "12rem;", height: "50px" }} src={item.image} alt={item.title} className="item-image" /></td>
                            <td className="title">{item.title}</td>
                            <td className="item-quantity">
                                <div className="quantity-controls">
                                    <button onClick={() => handleQuantityChange(index, -1)} className="quantity-btn">-</button>
                                    <span className="quantity-value">{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(index, 1)} className="quantity-btn">+</button>
                                </div>
                            </td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td><button onClick={() => handleRemoveItem(index)} className="delete-btn">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-end total-price">Total Price: ${calculateTotalPrice().toFixed(2)}</div>
        </div>
    );
};

export default ViewCarts;
