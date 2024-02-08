
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const {userModel,itemModel} = require('./model.js')
const bodyParser=require('body-parser')

const app=express()
app.use(cors())
app.use(express.json())

app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limit:'100mb',extended:true}));



mongoose.connect( 'mongodb+srv://rspj2503:Pradeep@2503@cluster0.kkphjjl.mongodb.net/?retryWrites=true&w=majority');

// app.get('/',async (req,res)=>{
//     try {
//         // Use Promise.all to run both queries concurrently
//         const [users, items] = await Promise.all([
//           userModel.find({}),
//           itemModel.find({})
//         ]);
    
//         console.log('Users:', users);
//         console.log('Items:', items);
    
//         // Send the combined result as a response
//         res.json({ users, items });
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
//     });

app.get('/',(req,res)=>
{
    userModel.find({}).
    then(users=>res.json(users)).
    catch((err)=>console.log(err))
})

app.get('/adminpage',(req,res)=>
{
    itemModel.find({}).
    then(items=>res.json(items)).
    catch(err=>console.log(err))
})

app.get('/userpage',(req,res)=>
{
    itemModel.find({})
    .then(items=>{
        res.json(items)})
    .catch(err=>console.log(err))    
})

app.get('/getUser/:id',(req,res)=>{
    const _id=req.params.id;
    itemModel.findById({_id})
    .then(items=>{
        res.json(items)})
    .catch(err=>console.log(err))
})

app.get('/itemcart/:id',(req,res)=>{
    const _id=req.params.id;
    itemModel.findById({_id})
    .then(items=>{
        console.log(items)
        res.json(items)})
    .catch(err=>console.log(err))
})

app.put('/update/:id',(req,res)=>{
    const _id=req.params.id;
    console.log(_id);
    itemModel.findByIdAndUpdate({_id}, {img:req.body.img, describe:req.body.describe, price:req.body.price})
    .then(items=>{
        console.log(items)
        res.json(items)})
    .catch(err=>console.log(err))
})

app.delete('/deleteuser/:id',(req,res)=>{
    const _id=req.params.id;
    console.log(_id)
    itemModel.findByIdAndDelete({_id})
    .then(items=>res.json(items))
    .catch(err=>console.log(err));
})

// const app=express()
// app.use(cors())
// app.use(express.json())

// mongoose.connect('mongodb://127.0.0.1:27017/crud');

// // get user
// const userSchema=new mongoose.Schema({
//     name:String,
//     mail:String,
//     password:String
// })
// console.log(userSchema.ObjectId)

// const userModel = mongoose.model("users",userSchema);


// app.get('/',(req,res)=>{
//     userModel.find({})
//     .then(users=>{
//         res.json(users)})
//     .catch(err=>res.json(err))
// })


// //post user
app.post('/signpage',(req,res)=>{
    userModel.create(req.body)
    .then(users=>{res.json(users)})
    .catch(err=>res.json(err))
})

app.post('/adminpage',(req,res)=>{
    itemModel.create(req.body)
    .then(users=>{res.json(users)})
    .catch(err=>res.json(err))
})


// //ITEMS

// const itemSchema=new mongoose.Schema({
//     img:String,
//     describe:String,
//     price:String
// })

// const itemModel=mongoose.model("items",itemSchema);

// app.get('/adminpage',(req,res)=>{
//     itemModel.find({})
//     .then(items=>res.json(items))
// })


app.listen(3001,()=>{
    console.log("server")
})
