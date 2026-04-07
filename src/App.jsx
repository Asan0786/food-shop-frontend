
import Menubar from '../components/Menubar/Menubar'
import ContactUs from '../pages/Contact Us/ContactUs';
import Explorer from '../pages/Explorer/Explorer';
import Home from '../pages/Home/Home';
import { Routes,Route } from 'react-router-dom';
import FoodDetails from '../pages/FoodDetails/FoodDetails';
import Cart from '../components/Cart/Cart';
import PlaceOrder from '../components/PlaceOrder/PlaceOrder';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import MyOrders from '../pages/MyOrders/MyOrders';
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { StoreContext } from '../components/Context/StoreContext';
const App = () => {
  const {token} = useContext(StoreContext);
  console.log("Token",token);
  console.log("LOcal Storage: ",localStorage.getItem("token"));
  return (
    <div>
      <Menubar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />}/>
        <Route path="/explorer" element={<Explorer />}/>
        <Route path="/food/:id" element={<FoodDetails />}/>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path ="/placeOrder" element = {token ? <PlaceOrder /> : <Login/>}></Route>
        <Route path="/login"   element={token ? <Home /> : <Login />}></Route>
        <Route path="/register" element={token ? <Home /> : <Register />}></Route>
        <Route path="/myOrders" element={token  ? <MyOrders/> : <Login />}></Route>
      
      </Routes>

    </div>
  )
}

export default App;
