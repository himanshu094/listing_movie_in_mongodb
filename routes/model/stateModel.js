 const mongoose=require("mongoose");
 const stateSchema=mongoose.Schema({
             statename:{
              type:String,
             require:true}
 })

module.exports=mongoose.model("statetb",stateSchema);







