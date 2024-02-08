import React from 'react'
import { useLocation } from 'react-router-dom';
import App from './App';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Avatar from './components/img/avatar.png'
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Toolbar, DialogTitle, DialogContent, DialogActions, Button,Card, CardContent, CardMedia, Dialog,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,IconButton } from '@mui/material';
import {   } from '@mui/material';


const Userpage = () => {
  const location=useLocation();
  const [items,setItem]=useState([''])
  const [cartitem,setCartitem]=useState([]);
  const [price,setPrice]=useState(0);
  

  const fetchData = async () => {
    try {
      const homeResponse = await axios.get('http://localhost:3001/userpage');
      setItem(homeResponse.data)
    }catch(err)
    {
      console.log(err);
    }
}

async function addtocart(id) {
  const getcartitem = await axios.get('http://localhost:3001/itemcart/' + id);
  const newItem = {
    id: cartitem.length > 0 ? cartitem[cartitem.length - 1].id + 1 : 1,
    describe: getcartitem.data.describe,
    price: getcartitem.data.price
  };

  const newCartItems = [...cartitem, newItem];
  const newTotalPrice = price + Number(getcartitem.data.price);

  setCartitem(newCartItems);
  setPrice(newTotalPrice);
}

async function removeFromCart(id) {
  const indexToRemove = cartitem.findIndex(item => item.id === id);
  if (indexToRemove === -1) return;

  const newTotalPrice = price - cartitem[indexToRemove].price;

  
  const newCartItems = cartitem.filter(item => item.id !== id);

  setCartitem(newCartItems);
  setPrice(newTotalPrice);
}

const handleOpenCart = () => {
  setShowCart(true);
};

const handleCloseCart = () => {
  setShowCart(false);
};
const [showCart, setShowCart] = useState(false);

const handleCartClick = () => {
  setShowCart(!showCart);
};
const handleRemoveItem = (id) => {
  setCartitem(cartitem.filter(item => item.id !== id));
};


const cartdisplay=cartitem.map((cart)=>{
  return(
    <li key={cart.id}>
        <div>{cart.describe}</div>
        <div>{cart.price}</div>
        <Button variant='primary' style={{ color: 'white' }} onClick={() => removeFromCart(cart.id)}>REMOVE</Button>
    </li>
  )
})

const totalPrice = cartdisplay.reduce((total, item) => total + item.price, 0);


const layout=items.map((im)=>
    {
      return(
      // <div className='text-center bg-white rounded-lg' style={{backgroundColor:"#c7f4c7"}}>
      //   <div style={{ width: '50%', height: 'auto' ,alignContent:"center"}}>
      //     <img src={im.img} alt='image' />

      //   <div class="max-w-sm rounded overflow-hidden shadow-lg">
      //   <img class="w-full" src={im.img} alt="Image" />
      //       <div>
      //  </div>
      //   <div>{im.describe}</div>
      //   <div>{im.price}</div>
      //   <div><Button onClick={()=>{addtocart(im._id)}}>ADD TO CART</Button></div>
        
      // </div>
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
        <Button variant='primary' onClick={()=>{addtocart(im._id)}} style={{color:'red'}}>Add to cart</Button>
      </CardContent>
    </Card> 
      
      )
    })

   
  

  useEffect(()=>{fetchData()},[])
  console.log(items)


  return (
    <>
    <header>
        <div className='flex justify-center bg-sky-700 hover:bg-green-600'>
            <img src={Avatar} alter='avatar' className='w-20'/>
            <div className='h-10 text-2xl hover:text-3xl p-5 font-serif underline text-black'>
                WELCOME {location.state.customer} 
            </div>
            
        </div>
    </header>

    <AppBar position="static">
      <Toolbar style={{ position:'revert-layer' }}>
        <div>
          {/* Cart Button */}
          <div onClick={handleCartClick} style={{ cursor: 'pointer', marginLeft: 'auto' }}>

            <ShoppingCartIcon style={{ fontSize: 30 }} />
          </div>
        </div>
      </Toolbar>
    </AppBar>

    <div className='flex mt-10'>
      <div className='grid grid-cols-3 gap-10 w-4/5'>
        {layout}
      </div>
      
      {showCart && (
       <Dialog open={showCart} onClose={handleCloseCart}>
       <DialogTitle>Shopping Cart</DialogTitle>
       <DialogContent>
         <TableContainer component={Paper}>
           <Table>
             <TableHead>
               <TableRow>
                 <TableCell>Name</TableCell>
                 <TableCell>Price</TableCell>
                 <TableCell>Remove</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {cartitem.map((item) => (
                 <TableRow key={item.id}>
                   <TableCell>{item.describe}</TableCell>
                   <TableCell>{item.price}</TableCell>
                   <TableCell>
                     <IconButton onClick={() => handleRemoveItem(item.id)} aria-label="delete">
                       <DeleteIcon />
                     </IconButton>
                   </TableCell>
                 </TableRow>
               ))}
               <TableRow>
                 <TableCell colSpan={2} align="right">
                   Total: {totalPrice}
                 </TableCell>
               </TableRow>
             </TableBody>
           </Table>
         </TableContainer>
       </DialogContent>
       <DialogActions>
         <Button onClick={handleCloseCart}>Close</Button>
       </DialogActions>
     </Dialog>

      )}
    </div>
    </>
  )
}


export default Userpage