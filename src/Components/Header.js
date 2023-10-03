import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between px-5 pt-4'>
        <h2>Dashboard</h2>
        <div className='flex gap-1'>
            <h2>Bem vindo,</h2><h2 className='text-s7green'> Ney Broker👋</h2>
        </div>
    </div>
  )
}

export default Header