const express=require("express");
const bodyparser=require("body-parser")
const mongoose=require("mongoose")

const app=express()
app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://127.0.0.1:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
var db=mongoose.connection;
db.on('Error',()=>{console.log('NO CONNECTION TO DB')});
db.once('open',()=>{console.log('Connection to db is successful')});
app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var password=req.body.password;

    var data={
        "name":name,    
        "email":email,
        "phone":phone,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    });
    return res.redirect('signup_success.html');
})
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-origin":'*'
    })
    return res.redirect('index.html');
}).listen(3000)
console.log("Listening on port 3000");
