const express = require('express');
const bp=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')
const User=require('./model/User')
const app = express();

app.use(bp.json())
app.use(cors())
const port = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://mubarak:64942224@trackerapp.wzus6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});
mongoose.Promise=global.Promise;
mongoose.connection.once('open',()=>{
    console.log('mongo started')
    app.listen(port,function() {
        console.log('listening on port 8000')
    })
}).on('error',(err)=>{
    console.log(err)
})
app.get('/',(req,res)=>{
    res.send('Success')
})

app.post('/update',(req,res)=>{
    const {longitude,email,ind,latitude}=req.body;
    // const longitude=location.split(',')[0]
    // const latitude=location.split(',')[1]
    User.findOne({email:email})
    .then(user=>{
        const cars=user.cars;
        cars[ind].latitude=latitude;
        cars[ind].longitude=longitude;
        user.cars=cars;
        user.save().then(user=>{
            res.send('suceess')
        }).catch(err=>{
            console.log(err)
        })
    })
   .catch(err=>{
       res.send(err)
   })
  
})
// app.get('/', (req, res) => res.send('Home Page Route'));
// app.get('/about', (req, res) => res.send('About Page Route'));
// app.get('/portfolio', (req, res) => res.send('Portfolio Page Route'));
// app.get('/contact', (req, res) => res.send('Contact Page Route'));

// app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));