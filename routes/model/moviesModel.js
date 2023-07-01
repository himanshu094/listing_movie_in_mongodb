const mongoose=require("mongoose");
const movieSchema=mongoose.Schema({
      
            stateid:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true,
                    ref:"statetbs"
            },
            cityid:{
                   type:mongoose.Schema.Types.ObjectId,
                   required:true,
                   ref:"citytbs"
            },
            cinemaid:{
              type:mongoose.Schema.Types.ObjectId,
              required:true,
              ref:"cinematbs"
            },
            screenid:{
              type:mongoose.Schema.Types.ObjectId,
              required:true,
              ref:"screentbs"
            },
            moviename:{
                    type:String,
                    require:true
            },
            description:{
              type:String,
              require:true
            },
            status:{
              type:String,
              require:true
            },
            poster:{
              type:String,
              require:true
            }
})


module.exports=mongoose.model("movietbs",movieSchema);