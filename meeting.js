const mongoose = require('mongoose')

//schema
const MeetingsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },
  // participants: {
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   email: {
  //     type: String,
  //     required: true
  //   }
  // },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
  //createTimestamp :Date

});

//model

module.exports=mongoose.model("Meeting",MeetingsSchema);
