import React from 'react'
// import Header from './Header'
import Header from '../../components/Header/Header';
import ExplorerMenu from '../../components/ExploreMenu/ExplorerMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import { useState } from 'react';

const Home = () => {
  const [category,setCategory] = useState('All');
  return (
    <main className='container' >
     <Header />
     <ExplorerMenu category={category} setCategory = {setCategory}/>
     <FoodDisplay category={category} searchText={''}/>
    </main>
  )
}

export default Home;
