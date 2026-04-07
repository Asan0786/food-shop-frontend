import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { calculateCartItemsTotal } from '../../utils/cartUtils';
import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import {RAZORPAY_KEY} from '../../utils/constants'
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
 const {quantities,foodList,token,setQuantities} =useContext(StoreContext);
 const navigate = useNavigate();

 const[data,setData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    address:'',
    state:'',
    city:'',
    zip:''
 });

  const onChangeHandler = (event) => {
       
       const name = event.target.name;
       const value = event.target.value;

       setData((data)=> ({...data, [name]:value}));

  };

  const onSubmitHandler = async (event) => {
       event.preventDefault();
       
       //create object to send to the backend
        const orderData = {
          userAddress: `${data.firstName}, ${data.lastName},${data.address}, ${data.city} ${data.state}`,

          phoneNumber: `${data.phoneNumber}`,

          email: `${data.email}`,
          orderItemList: cartItems.map(item=>({
            foodId: item.foodId,
            quantity: quantities[item.id],
            price: item.price * quantities[item.id],
            category: item.category,
            imageUrl: item.imageUrl,
            description: item.description,
            name: item.name,
          })),
          amount: total.toFixed(2),
          orderStatus: "Preparing"
        }

       try{
         const ressponse = await axios.post("http://localhost:8080/api/orders/create",orderData, 
          {headers : {'Authorization' : `Bearer ${token}`}}
         );
        
         if(ressponse.status === 201 && ressponse.data.razorpayOrderId){
             //initiate the payment

             initiateRazorpayPayment(ressponse.data);

         }else{
           toast.error("Unable to place order. Please try again");
         }
       }catch(error){
            toast.error("Unable to place order. Please try again.");
       }
  };

  const initiateRazorpayPayment = (order) => {
        const options = {
           key:RAZORPAY_KEY,
           amount : order.amount, //amount in paise
           currency : "INR",
            name: "Food House",
            description: "FOod Order payment",
            order_id: order.razorpayOrderId,

            //if payment successfull then following method should run

            handler : async function(razorpayResponse){
                await verifyPayment(razorpayResponse);
            },
            prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: `${data.email}`,
          contact: `${data.phoneNumber}`
         },
         theme : {color: '#3399cc'},
         modal: {
          ondismiss: async function(){
            toast.error("payment cancelled");
            await deleteOrder(order.id);
          },
         },
        };

        const razorPay = new window.Razorpay(options);
        razorPay.open();
  };
   
  const verifyPayment = async (razorpayResponse) => {
      const paymentData = {
          razorpay_order_id: razorpayResponse.razorpay_order_id,
          razorpay_payment_id: razorpayResponse.razorpay_payment_id,
          razorpay_signature : razorpayResponse.razorpay_signature
      };
    try{
       const response =  await axios.post('http://localhost:8080/api/orders/verify', paymentData, {headers: {'Authorization' : `Bearer ${token}`}});

    if(response.status === 200){ //verified successfully
       toast.success('Payment successfull');
       // once the payment successfull so clear the cart
       await clearCart();
       navigate('/myOrders');
       
    }else{
      toast.error('Payment failed');
      navigate('/');
      }
    }catch(error){ //handled Token expiry here
      if(error.response && error.response.status === 401){
        toast.error("Session expired. Please login again");
        navigate('/login');
        return ;
      }
      toast.error("Payment failed");
    }
  };

  const deleteOrder= async(orderId)=> {
    try{
       await axios.delete('http://localhost:8080/api/orders/' +orderId, {headers : {
        'Authorization' : `Bearer ${token}`
       
       }});
      
    }catch(error){
       toast.error('Something went wrong contact support meeting');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:8080/api/cart', {headers: 
        {'Authorization' : `Bearer ${token}`}});

         setQuantities();

    }catch(error){
        toast.error("could not clear the cart");
    }
  }

  //cart item :-> 
  const cartItems =  foodList.filter((food) => quantities[food.id] > 0);

  //calculating
   const{subtotal,shipping,tax,total} =  calculateCartItemsTotal(cartItems,quantities);

  return (
    <div>
 
    <div className="container mt-5">
      <div className="row">

        {/* Billing Form */}
        <div className="col-lg-8">
          <h4 className="mb-4">Billing Address</h4>
          <form onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>First name</label>
              <input type="text" className="form-control" placeholder="John" 
                name="firstName"
                value={data.firstName}
              onChange={onChangeHandler}/>
            </div>

            <div className="col-md-6 mb-3">
              <label>Last name</label>
              <input type="text" className="form-control" placeholder="Doe" 
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler} />
            </div>
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="email@example.com"
               name="email"
               value={data.email}
              onChange={onChangeHandler}/>
          </div>

          <div className="mb-3">
            <label>Phone</label>
            <input type="text" className="form-control"
            onChange={onChangeHandler}
            value={data.phoneNumber}
              name="phoneNumber"/>
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input type="text" className="form-control" placeholder="1234 Main St"
            name="address"
            value={data.address}
            onChange={onChangeHandler}/>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label>city</label>
              <select className="form-select" onChange={onChangeHandler} name="city" value={data.city}>
                <option>Choose...</option>
                <option>New Delhi</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label>State</label>
              <select className="form-select" onChange={onChangeHandler} name="state" value={data.state}>
                <option>choose</option>
                <option>Delhi</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label>Zip</label>
              <input type="text" className="form-control" onChange={onChangeHandler} name="zip" value={data.zip}/>
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-3" disabled = {cartItems.length ===0} type="submit" >
            Continue to Checkout
          </button>
          </form>
        </div>

        {/* Cart Summary */}
        <div className="col-lg-4">
          <h4 className="mb-3">
            <span className='text-primary'>Your cart</span>
            <span className='badge bg-primary rounded-pill m-2'>{cartItems.length}</span>
            </h4>
            
           
          <ul className="list-group mb-3">
              {cartItems.map((item)=> (
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className='my-0'>{item.name}</h6>
                <small>Qty: {quantities[item.id]}</small>
              </div>
              <span>&#8377;{item.price}</span>
            </li>
                ))}
           

            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping</span>
              <strong>&#8377;{subtotal ===0 ? 0 : shipping}</strong>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <span>Tax (10%)</span>
              <strong>&#8377;{tax.toFixed(2)}</strong>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <strong>Total (INR)</strong>
              <strong>&#8377;{total}</strong>
            </li>

          </ul>
        </div>

      </div>
    </div>
  

    </div>
  )
}

export default PlaceOrder;
