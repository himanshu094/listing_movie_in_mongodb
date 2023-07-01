const mongoose=require("mongoose");
const cinemaSchema=mongoose.Schema({
            cinemaname:{
                    type:String,
                    require:true},
            cinemalogo:{
                    type:String,
                    require:true}              
})

module.exports=mongoose.model("cinematb",cinemaSchema);