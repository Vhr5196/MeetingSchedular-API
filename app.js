const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const app = express();
const Meeting = require('./models/meeting')
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
//setup connection to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: "true",
  useUnifiedTopology: "true"
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to Database'))

app.use(express.json()); //server accepts JSON

//-------------------------End Points----------------------------

//get all Meetings
app.get("/meetings", paginatedResults(Meeting), function(req, res) {
  Meeting.find({}, function(err, foundMeetings) {
    if (!err) {
      res.json(foundMeetings);
    } else {
      res.json(err);
    }

  });
});

//get one meeting by using object id

app.get("/meeting/:id", async (req, res, next) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
    res.json(meeting);
  } catch (err) {
    return res.status(400).json({ //Bad input from client side
      message: err.message
    })
  }

});

//post request
//create a new meeting

app.post("/meetings", async (req, res, next) => {
  const meeting = new Meeting({
    title: req.body.title,
    participants: req.body.participants,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  });
  try {
    const newMeeting = await meeting.save()
    res.status(201).json(newMeeting); //object is created successfully
  } catch (err) {
    res.status(400).json({ //Bad Input from client side
      message: err.message
    });
  }
});


//get meetings within the timeframe

app.get("/meetings/:start/:end", paginatedResults(Meeting), async (req, res, next) => {
  try {
    let start = req.query.start
    let end = req.query.end
    const meetings = await Meeting.find({
      "startTime": {
        $gte:new Date(start),
        $lt:new Date(end)
      }
    });
    res.status(200).json(meetings);
  } catch (err) {
    return res.status(400).json({ //Bad Input from client side
      message: err.message
    });
  }
});

//get all the meeting of a participant
app.get("/meetings/(:email)", paginatedResults(Meeting), async (req, res, next) => {
  try {
    let email_r = req.params.email;
    const meeting = await Meeting.find({
      "participants.email": email_r
    }).toArray(function(err, result) {
      if (err)
        return console.log(err);
      res.json(meeting);
    });
  } catch (err) {
    return res.status(400).json({ //Bad Input from client side
      message: err.message
    });
  }
});


//update the meeting invitation with RSVP response

app.put('/meeting/:id', async (req, res, next) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }, (err, meeting) => {
      if(req.body.status=='Yes')
      res.status(200).json(meeting);  
    });
//checks overlap condition
// if a participant has 3 meetings then the participant responded with 'yes' for first meeting
//the participant should say no or not respond for second meeting if it is overlapping with first meeting.
  } catch (err) {
    return res.status(500).json({ //some problem in updating the meeting invitation
      message: err.message
    });
  }
});

//created pagination logic and added to the required routes.
function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit;
    const results = {};
    if (endIndex < await model.countDocuments.exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      result.prev = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next()
    } catch (e) {
      res.status(500).json({ //Internal server error
        message: e.message
      })
    }
    res.paginatedResults = results;
  }
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
