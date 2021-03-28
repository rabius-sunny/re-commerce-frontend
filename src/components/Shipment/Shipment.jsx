import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    // const savedCart = getDatabaseCart();
    // const orderDetails = { products: savedCart, shipment: data, orderTime: new Date() };

    // fetch('https://re-commerce-backend.herokuapp.com/order', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(orderDetails)
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data) {
    //       processOrder();
    //       alert('your order placed successfully');
    //     }
    //   })

    processOrder()
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
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
  );
};

export default Shipment;