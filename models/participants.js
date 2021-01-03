const mongoose=require('mongoose')

const participantsSchema=new mongoose.Schema({

  email:{
     type: String,
     required: true
   },
   meetings:[
     {
       type: mongoose.Schema.Types.ObjectId, ref:'Meeting'
     }
   ]



});

module.exports=mongoose.model("Participant",participantsSchema);
