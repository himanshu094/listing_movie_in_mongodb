const mongoose=require("mongoose");
const movieSchema=mongoose.Schema({
      
            stateid:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true,
                    ref:"statetb "
            },
            cityid:{
                   type:mongoose.Schema.Types.ObjectId,
                   required:true,
                   ref:"citytb"
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


module.exports=mongoose.model("movietb",movieSchema);