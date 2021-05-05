import React from 'react'
import { Link } from 'react-router-dom'
import './products.css'

function Products(props) {

    const { img, name, seller, price, stock, key } = props.product
    return (
        <div className="col-md-4 col-sm-6">
            <div className="product">
                <div>
                    <img src={img} alt="product" />
                </div>
                <div className="info">
                    <p className="name"><Link to={"/product/" + key}>{name}</Link></p>
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="by"><small>by: {seller} </small></p>
                        <p style={{color: 'orangered', fontWeight: 'bold'}}>$ {price} </p>
                    </div>
                    <p><small>Only {stock} left in stock - Order soon</small></p>
                    {props.addToCart && <button onClick={() => props.handleAddProduct(props.product)} className="cardBtn"> add to cart</button>}
                </div>
            </div>
        </div>
    )
}

export default Products
