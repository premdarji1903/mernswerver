const express=require('express');
require('dotenv').config()
const app=express();
app.use(express.json());
const port=process.env.PORT||5000;
const mongoose=require('mongoose');
const URL="mongodb+srv://prem:premdarji1903@cluster0.kpqhq6d.mongodb.net/mydb?retryWrites=true&w=majorityL";
mongoose.connect(URL,{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>{
    console.log(`success`)
}).catch((err)=>{
    console.log(err)
})
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
       
    },
    contact:{
        type:Number,
        
       
    },
    coment:{
        type:String,
      
    }
})
const User=mongoose.model("data",UserSchema);
User.createIndexes();
//backend
const cors=require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.get('/',(req,res)=>{
    res.send("server started");

})
app.post("/", async(req,res)=>{
    try {
        const { name, email, contact,coment } = req.body;
        const user = new User({ name, email, contact,coment });
        let result = await user.save();
        result = result.toObject();
        if (result) {
            res.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
 
    } catch (e) {
        res.send(e);
    }
});

app.listen(port,()=>{
    console.log("server started");
})
