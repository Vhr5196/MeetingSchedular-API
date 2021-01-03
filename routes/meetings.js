// const express = require('express')
// const router = express.Router();
// const Meeting = require('../models/meeting')
//
//
// //---------------endpoints---------
// //get all meetings
// router.get("/meetings", (req, res) => {
//   Meeting.find({}, (err, foundMeetings) => {
//     if (!err) {
//       res.json(foundMeetings);
//     } else {
//       res.json(err);
//     }
//
//   });
// });
//
//
// //create new meeting
// router.post("/meetings", async (req, res, next) => {
//   const meeting = new Meeting({
//     title: req.body.title,
//     participants: req.body.participants,
//     startTime: req.body.startTime,
//     endTime: req.body.endTime
//   });
//   try {
//     const newMeeting = await meeting.save()
//     res.status(201).json(newMeeting);
//   } catch (err) {
//     res.status(400).json({
//       message: err.message
//     });
//   }
// });
//
// //get meeting by objectID
// router.get("/meeting/:id", async (req, res, next) => {
//   try {
//     const meeting = await Meeting.findById(req.params.id)
//     res.json(meeting);
//   } catch (err) {
//     return res.status(400).json({
//       message: err.message
//     })
//   }
//
// });
//
// //get meetings within the timeframe
// router.get("/meetings/:start/:end", async (req, res, next) => {
//   try {
//     let start = req.query.start
//     let end = req.query.end
//     const meetings = await Meeting.find({
//       "startTime": {
//         $gte: new Date(start),
//         $lt: new Date(end)
//       }
//     });
//     res.status(200).send(meetings);
//   } catch (err) {
//     return res.status(400).json({
//       message: err.message
//     });
//   }
// });
//
// //get list of all meeting of a participant
// router.get("/meetings/(:email)", async (req, res, next) => {
//   //const email=req.params.email;
//   try {
//     let email_r = req.params.email;
//     const meeting = await Meeting.find({
//       "participants.email": email_r
//     }).toArray((err, result)=> {
//       if (err)
//         return console.log(err);
//       //if meeting not found
//       res.json(meeting);
//     });
//   } catch (err) {
//     return res.status(400).json({
//       message: err.message
//     });
//   }
// });
//
//
//
//
//
// // function paginatedResults(model){
// //   return (req,res,next)=>{
// //     const page= parseInt(req.query.page)
// //     const limit=parseInt(req.query.limit)
// //     const startIndex=(page-1)*limit
// //     const endIndex=page*limit;
// //     const results={};
// //     if(endIndex<model.length)
// //     {
// //       results.next={
// //         page: page+1,
// //         limit: limit
// //       }
// //     }
// //
// //     if(startIndex>0)
// //     {
// //       result.prev={
// //         page:page-1,
// //         limit:limit
// //       }
// //     }
// //     results.results=model.slice(startIndex,endIndex);
// //     res.paginatedResults=results;
// //     next();
// //   }
// // }
// module.exports = router
