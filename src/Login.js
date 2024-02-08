import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({userdata,setUserdata,customer,setCustomer}) => {

 

  useEffect(()=>{
    axios.get('http://localhost:3001')
  .then(result=>{setUserdata(result.data)})
  .catch(err=>console.log(err))},[])
  


    const navigate=useNavigate();

  function useradmin()
  {
    var mail=document.getElementById("maillogin").value;
    var password=document.getElementById("passwordlogin").value;
    var arr=userdata.filter((user)=>
    {
      if(user.mail==mail && user.password==password)
      {
        return user;
      }
    })
    if(arr.length===1)
    {
      if(arr[0].mail==="a@gmail.com" && arr[0].password==="a")
      {
        navigate('/adminpage',{state:{customer:customer}})
      }
      else
      {
        navigate('/userpage',{state:{customer:customer}})
      }
    }
    if(arr.length==0)
    {
      alert(" // SIGNUP //");
    }
  }

  return (
    <div>
      <Header />
     <div></div>
    <div style={{
  border: "3px solid",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "10px",
  width:"500px",
  height:"250px",
  backgroundColor:"white"
  }} className='grid justify-items-center'>

    <div> LOGIN PAGE</div>

    <div className='mt-5'>
      <input type="text" id="maillogin" placeholder='MAIL ID' onChange={(event)=>setCustomer(event.target.value)} size={25}/> 
    </div>

    <div className='mt-3'> 
      <input type="password" id="passwordlogin" placeholder='PASSWORD' size={25}/> 
    </div>

    <Button variant="outlined"size="small" onClick={useradmin}>
          SUBMIT
    </Button>
    <Button size="small">
      <Link to="/signpage">
      CREATE ACCOUNT
      </Link>
    </Button>
    </div>
    <Footer />
</div>
  )
}

export default Login