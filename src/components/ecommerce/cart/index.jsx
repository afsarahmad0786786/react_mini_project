
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategory() {
            try {
                const response = await axios.get(
                    'https://fakestoreapi.com/products/categories'
                );
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        getCategory();
    }, []);

    return (
        <>
            <div className="container-xl">
                <div className="shadow bg-body-tertiary rounded p-2 my-2 d-flex justify-content-center" style={{ width: '66.8em' }}>Choose categories</div>

                <div className="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));grid-gap: 1px">
                    <div className="row mt-3">
                        {categories.map((category, index) => (
                            <div key={index} className="card mb-3 mx-3 row" style={{ width: '15.1rem', height: '160px' }} role="button">
                                {/* Link to products page with category as parameter */}
                                <Link to={`/products/${category}`} className="card-body">
                                    <h5 className="card-title mx-4 my-4">{category}</h5>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
