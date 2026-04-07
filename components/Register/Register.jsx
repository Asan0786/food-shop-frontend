import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { resgisterUser } from '../../Service/AuthService';

const Register = () => {
    const navigate = useNavigate();
    const[data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
       const name = event.target.name;
       const value = event.target.value;

       setData((data)=> ({...data, [name]: value}));
    };

    
    const onSubmitHandler = async (event) => {
        event.preventDefault();
       
          
        try{
           
               const response = await resgisterUser(data);
            if(response.status === 201){
                toast.success("Registration completed ");
                navigate('/login');
            }else{
                toast.error("Registration failed try again");
            }
        } catch (error) {
            toast.error("Registere could not complete . please try again");
        } 
        
    };


  return (
    <div>
    

<div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-4">

            <div className="card p-4 shadow">
                <h3 className="text-center mb-3">Register</h3>

               <form onSubmit={onSubmitHandler}> 
                    
                    <div className="mb-3">
                        <label htmlFor="name" className="htmlForm-label">Full Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            placeholder="Enter your name"
                            name="name"
                            value={data.value}
                            onChange={onChangeHandler}
                            required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email"
                            name="email" 
                            value={data.value}
                            onChange={onChangeHandler}
                            placeholder="Enter your email"
                            required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Enter password"

                            name="password"
                            value={data.value}
                            onChange={onChangeHandler}
                            required/>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>

                </form>
            </div>

        </div>
    </div>
</div>





</div>

  )
}

export default Register
