import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import Avatar from './components/img/avatar.png'
import axios from 'axios'
import { Card, CardContent, CardMedia, Dialog,Typography, Button,CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
// import { Card } from "@mui/@material";


const Admin = (props) => {

  const location=useLocation();

  const [item,setItem]=useState(['']);
  const [img,setImage]=useState("");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setOpen(false);
  };
  async function fetchData()
  {
    try{
    const getitem=await axios.get('http://localhost:3001/adminpage')
    setItem(getitem.data);
    }
    catch(err)
    {console.log(err)}

  }

  useEffect(()=>
  {
   fetchData()
  });


  function additem()
  {
    handleClose();
    console.log(img)
    var describe=document.getElementById("admindescribe").value;
    var price=document.getElementById("adminprice").value;
    document.getElementById("admindescribe").value="";
    document.getElementById("adminprice").value="";
    axios.post("http://localhost:3001/adminpage",{img,describe,price})
    .then(result=>console.log(result))
    .catch(result=>console.log(result))
    // alert("SUCCESS - ADDED")
  }

  function deleteitem(id)
  {
    handleClose();
    console.log(id)
    axios.delete('http://localhost:3001/deleteuser/'+id)
    .then(res=>console.log(res)
    )
    .catch(res=>console.log(res))
  }


    const layout=item.map((im)=>
    {
      return(
      // <div className='text-center bg-white rounded-lg' style={{backgroundColor:"#c7f4c7"}}>
      //   <div style={{ width: '50%', height: 'auto' ,alignContent:"center"}}>
      //     <img src={im.img} alt='image' />

      <Card key={im._id} className="max-w-sm rounded overflow-hidden shadow-lg" sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        sx={{ height: 350 }}
        src={im.img}
        alt="Image"
      />
      <CardContent style={{ position: 'relative' }}>
          <div>{im.describe}</div>
        <div>{im.price}</div>
        <div><Link to={`/update/${im._id}`}>UPDATE</Link> 
        <Button variant='primary' onClick={(a)=>deleteitem(im._id)} style={{color:'red'}}>DELETE</Button></div>
      </CardContent>
    </Card> 
      )
    })





  return (
    
    <div >
    <header  >
        <div className='flex justify-center' style={{backgroundColor:'white'}}>
            <img src={Avatar} alter='avatar' className='w-20'/>
            <div className='h-10 text-2xl hover:text-3xl p-5 font-serif underline text-black'>
              Hello Restaurant
            </div>
        </div>
    </header>
    <div>
    <div className='text-right text-lg bg-white'>Welcome {location.state.customer}
        <Link to="/">
          <Button variant="contained" color="primary">
            Logout
          </Button>
        </Link>
    </div>
      </div>


    <br />
    <div>
      <center>

      <Button onClick={handleOpen} variant="contained" color="primary" >
        + Add Items
      </Button>
      </center>
      <Dialog open={open} onClose={handleClose}>
        <Card className="grid grid-cols-4 gap-4 bg-white mb-5 p-4 rounded-lg shadow-md">
          <div className="mt-3">
          <div className="mt-3">
            <input
              type="text"
              id="admindescribe"
              placeholder="ITEM"
              size={20}
              value={describe}
              onChange={(e) => setDescribe(e.target.value)}
            />
          </div>
          <div className="mt-3 mb-3">
            <input
              type="text"
              id="adminprice"
              placeholder="PRICE"
              size={20}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
            <input
              type="file"
              id="adminimg"
              accept="image/*"
              onChange={(a) => {
                var reader = new FileReader();
                reader.readAsDataURL(a.target.files[0]);
                reader.onload = () => {
                  console.log(reader.result);
                  setImage(reader.result);
                };
                reader.onerror = (err) => {
                  console.log(err);
                };
              }}
            />
          </div>
        </Card>
          <div className="flex items-center justify-center col-span-1">
            <Button onClick={additem} variant="contained" color="primary">
              ADD ITEM
            </Button>
          </div>
      </Dialog>
    </div>

    <div className='grid grid-cols-3 gap-8' style={{paddingLeft:40}}>
    {layout}
    </div>

    <footer className='w-full bottom-0 fixed hidden'>
        <div className='flex justify-center h-10 pt-2 gap-10 hover:bg-green-600'>
            <div>CONTACT US </div>
            <div>MAIL - app.app@gmail.com</div> 
            <div>PHONE_NUMBER - 1234567899</div>
        </div>
    </footer>

    </div>
  )
}

export default Admin