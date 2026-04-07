import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category , searchText}) => {
  const { foodList } = useContext(StoreContext);

  const filterFoods = foodList.filter((food) =>
    (category === 'All' || food.category === category) &&
    food.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // optional debug
  //console.log('filterFoods', filterFoods);

  return (
    <div>
      <div className="container">
        <div className="row">
          {filterFoods && filterFoods.length >  0 ? (
            filterFoods.map((food,index) => (

                 <FoodItem key={food.id} 
                 name = {food.name}
                 description={food.description}
                 price = {food.price}
                 id={food.id}
                 imageUrl = {food.imageUrl}

                  
                 />
            ))
          ) : (
            <div className="text-center mt-4">
              <h4>No food Found</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodDisplay;
