const mongoose = require('mongoose')

// created meeting schema
const MeetingsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  participants: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  }],

  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },

}, {
  timestamps: true
});

//exporting model
//Model name: Meeting
module.exports = mongoose.model("Meeting", MeetingsSchema);
