
import { useParams, Link } from 'react-router-dom';
import '../../../assets/styles/global.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';

import './style.scss'

const ProductList = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category || 'all');
    const [selectedSorting, setSorting] = useState('default');
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        async function getProductsByCategory() {
            let url = selectedCategory === 'all'
                ? 'https://fakestoreapi.com/products'
                : `https://fakestoreapi.com/products/category/${selectedCategory}`;

            try {
                const response = await axios.get(url);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        getProductsByCategory();
    }, [selectedCategory]);


    useEffect(() => {
        // Update the selected category when the URL parameter changes
        setSelectedCategory(category || 'all');
    }, [category]);



    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSortingChange = (event) => {
        setSorting(event.target.value);
    };

    const sortedProducts = products.sort((a, b) => {
        if (selectedSorting === 'low') {
            return a.price - b.price;
        } else if (selectedSorting === 'high') {
            return b.price - a.price;
        }
        return 0;
    });

    const addToCart = (product) => {
        console.log(product)
        // Get existing cart items from local storage
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        // Check if the product is already in the cart
        const existingProductIndex = existingCartItems.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            // If the product is already in the cart, increase its quantity
            existingCartItems[existingProductIndex].quantity++;
        } else {
            // If the product is not in the cart, add it
            existingCartItems.push({ ...product, quantity: 1 });
        }
        // Save updated cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    };

    useEffect(() => {
        const updateCartCount = () => {
            const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const itemCount = existingCartItems.length
            //  const itemCount = existingCartItems.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(itemCount);
        };

        updateCartCount();

        // Optional: Listen to storage events to sync cart count across tabs
        window.addEventListener('storage', updateCartCount);
        return () => window.removeEventListener('storage', updateCartCount);
    }, []);


    // Fetch products based on the category and render them
    // You can implement this part based on your specific requirements

    return (
        <>
            <div className='login-form-container'>
                <div>
                    <Link to="/project/ecommerce">Back</Link>
                </div>
                <div className="container-xl">
                    <div className='d-flex justify-content-end'>
                        <Link to={`/products/cart`}>
                            <h5 className="card-title mx-4 my-4">View Cart</h5>
                        </Link>
                        {cartCount > 0 && (
                            <div className="notification-icon">{cartCount}</div>
                        )}
                    </div>

                    <div className="shadow bg-body-tertiary rounded p-2 my-2 d-flex justify-content-center" style={{ width: '66.8em' }}>Buy a Products
                    </div>

                    <div className="row">
                        <div className="col-9">
                            Filter: &nbsp;
                            <select value={selectedCategory} onChange={handleCategoryChange}>

                                <option value="all">All</option>
                                <option value="electronics">Electronics</option>
                                <option value="jewelery">Jewellery</option>
                                <option value="men's clothing">Mens Clothing</option>
                                <option value="women's clothing">Womens Clothing</option>
                            </select>
                        </div>
                        <div className="col-3">
                            Sort By Price: &nbsp;
                            <select value={selectedSorting} onChange={handleSortingChange}>

                                <option disabled value="default">Select Sort</option>
                                <option value="low">Low to High</option>
                                <option value="high">High to Low</option>
                            </select>
                        </div>
                    </div>


                    <div className="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));grid-gap: 1px">
                        <div className="row mt-3">
                            {sortedProducts.map((product, index) => (
                                <div key={index} className="card mb-3 mx-3 row" style={{ width: '15rem', height: '90%' }} role="button">
                                    <img src={product.image} style={{ height: "190px" }} className='card-img-top p-2' alt={product.title} />
                                    {/* Link to products page with category as parameter */}
                                    <h5 className="card-title mx-4 my-4 title" data-title={product.title}>{product.title}</h5>
                                    <h6 className="card-title mx-4 my-4">Price:${product.price}</h6>
                                    <button onClick={() => addToCart(product)} className="btn btn-danger my-4">Add to Cart</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );

};

export default ProductList;
