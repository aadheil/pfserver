const mongoose=require('mongoose')
const connectionString= process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb Atlas connected successfully with pfserver");
}).catch(err=>{
    console.log("Mongodb connection failed: "+err);
})