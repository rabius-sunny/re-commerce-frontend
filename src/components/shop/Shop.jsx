import React, { useEffect, useState } from 'react'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
// import './shop.css'
import Products from '../products/Products'
import Spinner from '../Spinner'
import Cart from '../cart/Cart'
import { Link } from 'react-router-dom'

function Shop() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('https://re-commerce-backend.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        fetch('https://re-commerce-backend.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [])
    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1
            sameProduct.quantity = count
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct]
        } else {
            product.quantity = 1
            newCart = [...cart, product]
        }

        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div>
                            {products.length === 0 && <Spinner />}
                            {
                                products.map(product => <Products
                                    key={product.key}
                                    product={product}
                                    addToCart={true}
                                    handleAddProduct={handleAddProduct}
                                />)
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="cart">
                            <Cart cart={cart}>
                                <Link to="/review"><button className="cardBtn">Review Order</button></Link>
                            </Cart>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Shop
