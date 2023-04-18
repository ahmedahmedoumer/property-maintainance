const mongoose = require ("mongoose");

module.exports = () =>{
    mongoose.
    set("strictQuery",false)
    .connect('mongodb://127.0.0.1:27017/myapp')
    
    .then(()=>{
        console.log("DB CONNECTED")
    })
    .catch((err)=>{
        console.log(err);
    })



}
  

