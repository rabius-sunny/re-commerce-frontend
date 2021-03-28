import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Products from '../products/Products'

function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch('https://re-commerce-backend.herokuapp.com/' + id)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])
    return (
        <section>
            <div className="container">
                <h1> Product Details of {id}</h1>
                <Products addToCart={false} product={product} />
            </div>
        </section>
    )
}

export default ProductDetails
