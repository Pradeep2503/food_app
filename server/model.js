// // Requiring module 
// const mongoose = require('mongoose'); 
  
// // Course Modal Schema 
// const userSchema = new mongoose.Schema({ 
//     name:String,
//     mail:String,
//     password:String 
// }); 
  
// // Student Modal Schema 
// const itemSchema = new mongoose.Schema({ 
//     img:String,
//     describe:String,
//     price:String
// }); 
  
  
// // Creating model objects 
// const userModel = mongoose.model('users', userSchema); 
// const itemModel = mongoose.model('items', itemSchema);  
  
// // Exporting our model objects 
// module.exports = { 
//     userModel,itemModel
// }


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rspj2503:Pradeep@2503@cluster0.kkphjjl.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);