import React from 'react'
import TotalItemsProvider from './TotalItems';
import {
    MdOutlineCardGiftcard,
} from 'react-icons/md'
import { MdDirectionsBoat } from 'react-icons/md';

const TopCards = () => {
  return (
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
    {/* Card Total de Produtos */}
    <TotalItemsProvider>
      {(totalItems) => (
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
          <div className='flex flex-col w-full pb-4'>
            <p className='text-2xl font-bold'>{totalItems}</p>
            <p className='text-gray-600'>Total de Embarcações</p>
          </div>
          <p className='bg-gray-700 flex justify-center items-center p-[1.4rem] rounded-lg'>
            <span className='text-white text-lg'><MdDirectionsBoat /></span>
          </p>
        </div>
      )}
    </TotalItemsProvider>

    {/* Card de Faturamento */}
    <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
      <div className='flex flex-col w-full pb-4'>
        <p className='text-xl font-bold'>Em andamento...</p>
        <p className='text-gray-600'>Faturamento do mês</p>
      </div>
      <p className='bg-gray-700 flex justify-center items-center p-2 rounded-lg'>
        <span className='text-white text-lg'>+28%</span>
      </p>
    </div>

    {/* Card de Acessos */}
    <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
      <div className='flex flex-col w-full pb-4'>
        <p className='text-xl font-bold'>Em andamento...</p>
        <p className='text-gray-600'>Acessos ao Site</p>
      </div>
      <p className='bg-gray-700 flex justify-center items-center p-2 rounded-lg'>
        <span className='text-white text-lg'>+11%</span>
      </p>
    </div>
  </div>
);
};

export default TopCards