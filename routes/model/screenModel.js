const mongoose=require("mongoose");
const screenSchema=mongoose.Schema({
            screenname:{
                    type:String,
                    require:true},
            cinemaid:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true,
                    ref:"cinematb"
            }
})


module.exports=mongoose.model("screentb",screenSchema);