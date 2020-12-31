// const express=require('express')
// const router=express.Router();
// const Meeting=require('../models/meeting')
//
//
// //routes
// //get all
// router.get("/meetings",function(req,res){
//   Meeting.find({},function(err,foundMeetings){
//     if(!err)
//     {
//         res.json(foundMeetings);
//     }else{
//       res.json(err);
//     }
//
//   });
// });
// // router.get("/meetings", async(req,res)=>
// // {
// //   try{
// //     const foundmeetings= await Meeting.find()
// //     res.json(foundmeetings)
// //   }catch(err)
// //   {
// //     res.status(500).json({message:err.message})
// //   }
// //
// // });
// //get one
// // router.get("/:id",paginatedResults(meetings), (req,res)=>{
// //   req.params.id;
// // });
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
// // module.exports=router
