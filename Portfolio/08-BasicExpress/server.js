const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.route('/')
.get((req, res) => {
  res.sendFile(__dirname+"/index.html")
})
.post((req,res)=>{
  var weight=req.body.weight;
  var height=req.body.height;
  res.send("Your MBI is: "+ weight/(height*height)*10000);

});

app.get('/about', (req, res) => {
    res.send('Hello My Friends')
  });



app.listen(3000, ()=>{
    console.log("Aplication Listening port 3000")
});

