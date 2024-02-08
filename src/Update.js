import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const Update = () => {
    const {id}=useParams();
    console.log(id)
    const navigate=useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const [describe,setDescribe]=useState("");
    const [price,setPrice]=useState("");
    const handleClose = () => {
        setOpen(false);
      };

    const [upitems,setUpitems]=useState([''])

    const fetchData=async()=>{
        try{
        const toupdatedata=await axios.get(`http://localhost:3001/getUser/`+id);
        setUpitems(toupdatedata.data);
        
        }
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(()=>{fetchData()},[]);
    console.log(upitems)

    function display()
    {
        document.getElementById("updatedescribe").value=upitems.describe;
        document.getElementById("updateprice").value=upitems.price;
        handleClose();
    }

    async function updatevalues()
    {
        var img=upitems.img;
        var describe=  document.getElementById("updatedescribe").value;
        var price=document.getElementById("updateprice").value;
        // alert("UPDATED");
        document.getElementById("updatedescribe").value="";
        document.getElementById("updateprice").value=""
        console.log(describe,price)
        await axios.put(`http://localhost:3001/update/`+id,{img,describe,price})
        .then(result=>{
            console.log(result.data);
            navigate('/adminpage',{state:{customer:"LAST ACTION - UPDATE"}})
        })
        .catch(err=>console.log(err))
        handleClose();
    }

  return (
    <div style={{
        border: "3px solid",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "10px",
        width:"500px",
        height:"500px",
        backgroundColor:"white"
        }} className='grid justify-items-center'> 
         <div class="max-w-sm rounded shadow-lg">
        <img class="w-40 h-40" src={upitems.img} alt="Image" style={{ transition: 'transform 0.2s' }}
        onMouseOver={(e) => { e.target.style.transform = 'scale(1.2)' }} 
        onMouseOut={(e) => { e.target.style.transform = 'scale(1)' }} />
            </div>
        <div>
            <input type="text" id="updatedescribe" placeholder='DESCRIBE'/>
        </div>
        <div>
            <input type="text" id="updateprice" placeholder='PRICE'/>
        </div>
        <div><Button onClick={display}>DISPLAY</Button> </div>
        <div><Button onClick={updatevalues}>UPDATE VALUE</Button></div>

    </div>
  )
}

export default Update