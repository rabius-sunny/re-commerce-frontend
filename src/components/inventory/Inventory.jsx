import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Inventory() {

    const history = useHistory()

    const [data, setData] = useState({
        name: '',
        price: '',
        quantity: '',
        pdBy: '',
        img: ''
    })
    const handleChange = e => {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }
    const handleSubmit = () => {
        fetch('https://re-commerce-backend.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        history.push('/')
    }

    return (
        <div className="container pb-5">
            <h1 className="m-5 pb-5">Inventory</h1>
            <div className="mb-3">
                <label htmlFor="pdname" className="form-label">Product Name</label>
                <input type="text" name="name" onChange={handleChange} className="form-control" id="pdname" placeholder="enter name" />
            </div>
            <div className="mb-3">
                <label htmlFor="pdPrice" className="form-label">Product's Price</label>
                <input type="number" name="price" onChange={handleChange} className="form-control" id="pdPrice" placeholder="enter price" />
            </div>
            <div className="mb-3">
                <label htmlFor="pdQuantity" className="form-label">Product's Quantity</label>
                <input type="number" name="quantity" onChange={handleChange} className="form-control" id="pdQuantity" placeholder="enter quantity" />
            </div>
            <div className="mb-3">
                <label htmlFor="pdBy" className="form-label">Product By</label>
                <input type="text" name="pdBy" onChange={handleChange} className="form-control" id="pdBy" placeholder="enter saler name" />
            </div>
            <div className="mb-3">
                <label htmlFor="pdImg" className="form-label">Product's Image</label>
                <input type="text" name="img" onChange={handleChange} className="form-control" id="pdImg" placeholder="enter image url" />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">Add a Product</button>
        </div>
    )
}

export default Inventory
