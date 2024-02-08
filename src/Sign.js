import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect , useState} from 'react'

const Sign = () => {

  function postdata()
  {
    var name=document.getElementById("namesign").value;
    var mail=document.getElementById("mailsign").value;
    var password=document.getElementById("passwordsign").value;
    document.getElementById("namesign").value="";
    document.getElementById("mailsign").value="";
    document.getElementById("passwordsign").value="";
    axios.post("http://localhost:3001/signpage",{name,mail,password})
    .then(result=>console.log(result))
    .catch(result=>console.log(result))
    alert("SUCCESS - GO TO LOGIN PAGE")
  }

  return (
    <div>
      <Header />
     
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

    <div> SIGNUP PAGE</div>

    <div className='mt-5'>
      <input type="text" id="namesign" placeholder='NAME' size={25}/> 
    </div>

    <div className='mt-3'>
      <input type="text" id="mailsign" placeholder='MAIL ID' size={25}/> 
    </div>

    <div className='mt-3 mb-2'> 
      <input type="text" id="passwordsign" placeholder='PASSWORD' size={25}/> 
    </div>

    <Button variant="outlined"size="small" onClick={postdata}>
          SUBMIT
    </Button>

    <Button size="small">
      <Link to="/">
      Already A USER ?
      </Link>
    </Button>
    </div>

    <Footer />
</div>
  )
}

export default Sign