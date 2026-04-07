import React, { useContext, useEffect,useState } from 'react'
import { StoreContext } from '../../components/Context/StoreContext'
import axios from 'axios';
import { assets } from '../../src/assets/assets';


const MyOrders = () => {
  
    const { token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOders = async () => {
       const response = await axios.get('http://localhost:8080/api/orders', {headers : {Authorization : `Bearer ${token}`}});
        console.log(response);
       //set the data
       setData(response.data);
      
    };

    useEffect(() => {
        if(token){
          fetchOders();
        }
    },[token]);


  return (
    <div>
        <div className="container">
          <div className="py-5 row justify-content-center">
             <div className="col-11-card">
                <table className = "table table-response">
                   <tbody>

                     {data.map((order,index) => {
                        return (
                          <tr key={index}>

                            <td>
                              <img src={assets.delivery} alt=""  height={48} width={48}></img>
                            </td>

                            <td>{order.orderedItems.map((item) => {
                                if(index == order.orderedItems.length -1){ //it checks is it the last item in list
                                                                    
                                   return (item.name || "Unknown item") + " x " +item.quantity;
                                }else{
                                  return (item.name || "Unknown item") + "x" + item.quantity+ ",";
                                }
                            })}</td>
                            <td>&#8377;{order.amount.toFixed(2)}</td>
                            <td>{order.orderedItems.length}</td>
                            <td className='fw-bold text-capitalize'>{order.orderStatus}</td>
                            <td>
                              <button className='btn btn-sm btn-warning' onClick={fetchOders}>
                                <i className='bi bi-arrow-clockwise'></i>
                              </button>
                            </td>
                          </tr>
                        )
                     })}
                   </tbody>
                </table>
             </div>

          </div>

        </div>
    </div>
  )
}

export default MyOrders
