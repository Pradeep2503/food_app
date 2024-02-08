import React from 'react'
import Logo from './components/img/chef1.png'
import {MdShoppingBasket} from 'react-icons/md'

const Header = () => {
  return (
    <>
    <header>
        <div className='flex justify-center bg-white'>
            <img src={Logo} alter="logo" className='w-20'/>
            <div className='h-10 text-2xl hover:text-3xl p-5 font-serif underline text-black'>
              Welcome ! ORDER YOUR FOOD
            </div>
        </div>
    </header>
    </>
        
  )
}

export default Header