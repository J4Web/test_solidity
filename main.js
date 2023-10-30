//server set up 


const express=require('express');
const path = require('path');
const app=express();


//middlewares here
app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    const pathLink=path.join(__dirname,'./public/index.html');
    console.log(pathLink);
res.sendFile(pathLink);

})
const port=3000;

app.listen(port,()=> console.log(`We're connected ${port}`))
