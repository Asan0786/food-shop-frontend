import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';
import { StoreContext } from '../Context/StoreContext';
import { login } from '../../Service/AuthService';

const Login = () => {
     const{setToken,loadCartData} =   useContext(StoreContext);

    const navigate = useNavigate();

    const[data, setData] = useState({
        email:'',
        password:''
    })

    const onChangeHandler  = (event) => {
         
        const name = event.target.name;
        const value = event.target.value;

        setData((data) => ({...data, [name]:value}));  
    };


    const onSubmitHandler = async (event) => {
           event.preventDefault();

        try{
           const response = await login(data);

           if(response.status === 200){
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate('/');
                loadCartData(response.data.token);
           }else{
            toast.error('Unable to log in');
           }
        }catch(error){
             toast.error('something went wrong');
        }
    }

  return (
    <div>

{/* <button
    type="button"
    className="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#loginModal"
  >
    Open Login
  </button> */}
<div className="container login-container" id="loginModal" aria-labelledby="loginModalLabel" >
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title fw-white">Login</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-white">Email address</label>
                        <input type="email" className="form-control" id="email" 
                         name="email"
                         onChange={onChangeHandler}
                        required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{color:"white"}}>Password</label>
                        <input type="password" className="form-control" id="password" 
                        onChange={onChangeHandler}
                        name="password"
                        required/>
                    </div>
                    <div className="mb-3 form-check">
                       
                    </div>
                    <button type="submit" className="btn btn-primary m-2">Login</button>
                     <Link to={"/register"}>Create new Account</Link>
                </form>
            </div>
            
        </div>
    </div>
</div>
    </div>
  )
}

export default Login;
