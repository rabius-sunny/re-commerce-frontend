import React, { useEffect, useState } from 'react'
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager'
import Cart from '../cart/Cart'
import Spinner from '../Spinner'
import ReviewItems from '../reviewItems/ReviewItems'
import { useHistory } from 'react-router-dom'

function Review() {
    const [cart, setCart] = useState([])
    const history = useHistory()

    const handleProceedCheckout = () => {
        history.push('/shipment')
    }
    const removeProduct = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
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

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        {cart.length === 0 && <Spinner />}
                        {cart.length !== 0 && <h1 style={{ color: 'darkblue' }}>Total Cart Items: {cart.length}</h1>}
                        {
                            cart.map(pd => <ReviewItems
                                product={pd}
                                key={pd.key}
                                removeProduct={removeProduct}
                            />)
                        }
                    </div>
                    <div className="col-md-4">
                        <Cart cart={cart}>
                            <button onClick={handleProceedCheckout} className="cardBtn">Proceed Checkout</button>
                        </Cart>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Review
