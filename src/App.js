import React, { useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import Login from './Login';
import Sign from './Sign';
import axios from 'axios';
import { useEffect } from 'react';
import Admin from './Admin';
import Userpage from './Userpage';
import Update from './Update';

const App = () => {
  
  const [userdata,setUserdata] =useState(['']);
  const [customer,setCustomer] =useState('');
  const [itemdata,setItemdata]=useState(['']);

  return (
   <div className='h-screen bla'>
    
   <Routes>
      <Route path="/" element={<Login userdata={userdata} setUserdata={setUserdata} customer={customer} setCustomer={setCustomer}/>} />
      <Route path="/signpage" element={<Sign/>} />
      <Route path="/adminpage" element={<Admin  customer={customer} />} />
      <Route path="/userpage" element={<Userpage customer={customer}/>} />
      <Route path="/update/:id" element={<Update/>} /> 
  </Routes>
   </div>
  )
}

export default App