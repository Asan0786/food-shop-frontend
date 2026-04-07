import React, { useContext } from 'react'
import './Menubar.css';
import { assets  } from '../../src/assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import { useState } from 'react';

import { Navigate } from 'react-router-dom';
const Menubar = () => {
    const {foodList,quantities,token,setToken,setQuantities} = useContext(StoreContext);
    const cartItem = foodList.filter((food) => quantities[food.id] > 0);
    const [active,setActive] = useState('Home');
    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem('token');
      setToken(null);
      setQuantities({});
      navigate('/');
    }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <img src={assets.delivery} alt="" className="mx-4" height={48} width={48}></img>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>

    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={active === 'Home' ? 'nav-link active fw-bold' : 'nav-link'} aria-current="page" to="/" onClick={() => setActive('Home')}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={active === 'explore'? 'nav-link active fw-bold': 'nav-link'} to="/explorer" onClick={()=> setActive('explore')}>Explorer</Link>
        </li>
       
        <li className="nav-item">
          <Link className={active === 'contact'? 'nav-link active fw-bold': 'nav-link'} to="/contact" onClick={()=> setActive('contact')}>contact us</Link>
        </li>
       
      </ul>

      <div className='d-flex align-items-center gap-4'>
        <Link to={'/cart'}>
          <div className="position-relative">
          <img src={assets.cart} width={48} height={48} className='position-relative' />
            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning'>{cartItem.length}</span>
        </div>
        </Link>

        {!token ? <>
         <button className="btn btn-outline-primary"  onClick = {()=> navigate('/register')}>Register
             
            </button>
         <button className="btn btn-outline-success" onClick = {()=> navigate('/login')}>Login
            </button>
        
        </> : <div className='dropdown text-end'>
          
           <img src={assets.profile} alt="profile"
            width={32} 
            height={32} 
            className='rounded-circle dropdown-toggle'
            data-bs-toggle="dropdown"
            />
           <ul className='dropdown-menu text-small'>

            <li className='dropdown-item'
              onClick={()=> navigate('/myorders')}
            >Orders</li>

            <li className='dropdown-item' onClick={logout} >Logout</li>
           </ul>
           </div>
          }
           

      </div>
     
    </div>
  </div>
</nav>
    </div>
  )
}

export default Menubar;
