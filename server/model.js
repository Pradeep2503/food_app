// Requiring module 
const mongoose = require('mongoose'); 
  
// Course Modal Schema 
const userSchema = new mongoose.Schema({ 
    name:String,
    mail:String,
    password:String 
}); 
  
// Student Modal Schema 
const itemSchema = new mongoose.Schema({ 
    img:String,
    describe:String,
    price:String
}); 
  
  
// Creating model objects 
const userModel = mongoose.model('users', userSchema); 
const itemModel = mongoose.model('items', itemSchema);  
  
// Exporting our model objects 
module.exports = { 
    userModel,itemModel
}