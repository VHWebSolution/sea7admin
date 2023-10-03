import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    BsGlobeAmericas
    } from 'react-icons/bs';
import Logo from '../Assets/LOGO-s7.png'
import {
    MdDashboard,
    MdAddBox,
    MdArrowRight,
    MdViewCarousel,
    MdLogout,
} from 'react-icons/md'

const Sidebar = ({ children }) => {
     const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Verifica se há um token salvo no Local Storage
     const [sidebarVisible, setSidebarVisible] = useState(true);
  
    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
    };

    const handleLogout = () => {
      // Remover token do Local Storage
      localStorage.removeItem('token');
      // Definir como deslogado
      setIsLoggedIn(false);

    };
  
    return (
      <div className='flex'>
         <button
            className={`text-white h-14 bg-gray-800 hover:bg-gray-600 cursor-pointer fixed top-0 rounded-l-none rounded-xl ${
            sidebarVisible ? 'left-[16rem]' : 'left-0'
            } p-3  flex gap-3 items-center z-20 transition-left duration-300`}
            onClick={toggleSidebar}
            >
            <MdArrowRight size={20} />
        </button> 
        <div
          className={`fixed w-64 h-screen p-4 bg-gray-800 flex flex-col justify-between z-20 transform transition-transform duration-300 ${
            sidebarVisible ? '' : '-translate-x-64'
          }`}
        >
        <div className='flex flex-col'>
          <NavLink to='/'>
            <div className='flex justify-center'>
                <img src={Logo} className='w-[80px]' />
            </div>  

          </NavLink>
          <span className='border-b-[1px] border-gray-200 w-full p-2 mb-4'></span>
          <NavLink to='/dashboard'>
            <div className='text-white hover:bg-gray-600 cursor-pointer my-2 p-3 rounded-lg flex gap-3 items-center'>
              <MdDashboard size={20} />
              <span>Dashboard</span>
            </div>
          </NavLink>
          <NavLink to='/adicionar-produto'>
            <div className='text-white hover:bg-gray-600 cursor-pointer my-2 p-3 rounded-lg flex gap-3 items-center'>
              <MdAddBox size={20} />
              <span>Adicionar Embarcação</span>
            </div>
          </NavLink>
          <NavLink to='/gerenciar-produto'>
            <div className='text-white hover:bg-gray-600 cursor-pointer my-2 p-3 rounded-lg flex gap-3 items-center'>
              <MdViewCarousel size={20} />
              <span>Gerenciar Embarcações</span>
            </div>
          </NavLink>
          <NavLink to='https://vhwebsolutions.com.br/'>
            <div className='text-white hover:bg-gray-600 cursor-pointer my-2 p-3 rounded-lg flex gap-3 items-center'>
                <BsGlobeAmericas size={20} />
                <span>Acessar o site</span>
            </div>
          </NavLink>
        </div>
        <div className="mt-auto">
        {isLoggedIn && (
            <NavLink to='/'>
                <div className='text-white hover:bg-gray-600 cursor-pointer my-2 p-3 rounded-lg flex gap-3 items-center' onClick={handleLogout}>
                  <MdLogout size={20} />
                  <span>Log out</span>
                </div>
            </NavLink>
             )}
            </div>
        </div>
      </div>
    );
};

export default Sidebar;