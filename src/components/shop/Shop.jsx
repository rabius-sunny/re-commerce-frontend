import React, { useContext, useEffect, useState } from 'react'
import Products from '../products/Products'
import { addToDatabaseCart } from '../../utilities/databaseManager'
import Spinner from '../Spinner'
import './shop.css'
import { CartContext } from '../../App'

function Shop() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useContext(CartContext)
    let product = products.slice(0, 19)

    useEffect(() => {
        fetch('https://re-commerce-backend.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
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
        <section className={products.length === 0 && 'mySection'}>
            <div className="container">
                <div className="row">
                    {products.length === 0 && <Spinner />}
                    {
                        product.map(product => <Products
                            key={product.key}
                            product={product}
                            addToCart={true}
                            handleAddProduct={handleAddProduct}
                        />)
                    }
                </div>
            </div>
        </section>
    )
}

export default Shop
