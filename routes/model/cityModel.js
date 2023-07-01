const mongoose=require("mongoose");
const citySchema=mongoose.Schema({
            cityname:{
                    type:String,
                    require:true},
            stateid:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true,
                    ref:"statetb"
            }
})


module.exports=mongoose.model("citytb",citySchema);