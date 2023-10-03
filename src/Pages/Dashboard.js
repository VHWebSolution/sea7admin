import React from 'react';
import Header from '../Components/Header';
import ProdutosT from '../Components/ProdutosT';
import TopCards from '../Components/TopCards';
import BottomCards from '../Components/BottomCards';

const Dashboard = ({token}) => {
  return (
      <div className='grid mx-[9vw] pt-0.5 '>
        <Header />
        <ProdutosT token={token}/>
        <TopCards />
        <BottomCards />
     
      </div>
  );
};

export default Dashboard;
