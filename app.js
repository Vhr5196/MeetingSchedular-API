const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Meeting=require('./models/meeting')
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//setup connection to database
mongoose.connect("mongodb://localhost:27017/MeetingsDB",{useNewUrlParser:"true",useUnifiedTopology:"true"})
const db=mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=> console.log('connected to Database'))

app.use(express.json());//server accepts JSON



// app.get("/users" , paginatedResults(users),(req,res)=>{
// res.json(res.paginatedResults);
// });
//routes
//get Meetings
app.get("/meetings",function(req,res){
  Meeting.find({},function(err,foundMeetings){
    if(!err)
    {
        res.json(foundMeetings);
    }else{
      res.json(err);
    }

  });
});

app.get("/meetings/:id", getMeeting,(req,res)=>{
  res.json(res.meeting);
})

 async function getMeeting(req,res,next)
 {
   let meeting
   try{
     meeting=await Meeting.findById(req.params.id)
     if(meeting== null)
     {
       return res.status(404).json({message : 'Cannot find meeting'})
     }
   }catch(err){
     return res.status(500).json({message:err.message})
   }
   res.meeting=meeting
   next()
 }
//post request
app.post("/meetings", async (req,res)=>{
  const meeting=new Meeting({
    id:req.body.id,
    title: req.body.title,
    // name:req.body.participants.name,
    // email:req.body.participants.email,
    startTime:req.body.startTime,
    endTime: req.body.endTime

  })
  try{
    const newMeeting=await meeting.save()
    res.status(201).json(newMeeting);
  }catch{
    res.status(400).json({message:err.message});
  }
});

function paginatedResults(model){
  return (req,res,next)=>{
    const page= parseInt(req.query.page)
    const limit=parseInt(req.query.limit)
    const startIndex=(page-1)*limit
    const endIndex=page*limit;
    const results={};
    if(endIndex<model.length)
    {
      results.next={
        page: page+1,
        limit: limit
      }
    }

    if(startIndex>0)
    {
      result.prev={
        page:page-1,
        limit:limit
      }
    }
    results.results=model.slice(startIndex,endIndex);
    res.paginatedResults=results;
    next();
  }
}
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
