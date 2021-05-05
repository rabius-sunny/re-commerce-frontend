import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './Shipment.css'
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager'
import PaymentProcess from '../Payment_Processing/PaymentProcess'
import { useHistory } from 'react-router'

const Shipment = () => {

  const { register, handleSubmit, errors } = useForm()
  const [shippingData, setShipingData] = useState(null)
  const history = useHistory()

  const onSubmit = data => {
    setShipingData(data)
  }

  const getPayment = paymentId => {
    const savedCart = getDatabaseCart()
    const orderDetails = {
      products: savedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date()
    };
    fetch('https://re-commerce-backend.herokuapp.com/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('your order placed successfully');
        }
      })

    processOrder()
    alert('your order placed successfully');
    history.push('/')
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6" style={{ display: shippingData ? 'none' : 'block' }} >
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" ref={register({ required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
            {errors.phone && <span className="error">Phone Number is required</span>}

            <input type="submit" />
          </form>
        </div>
        <div className="col-md-6" style={{ display: shippingData ? 'block' : 'none' }}>
          <p>Pay for your Order</p>
          <PaymentProcess handlePayment={getPayment} />
        </div>
      </div>
    </div >
  );
};

export default Shipment;