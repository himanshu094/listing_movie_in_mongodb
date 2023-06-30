const mongoose=require("mongoose");
const pool=()=>{
      mongoose.Promise=global.Promise;
      const options={};

      mongoose.connect(
        `mongodb://127.0.0.1:27017/moviedatabase?retryWrites=true&w=majority`,
        options
      );

      mongoose.connection
      .once("open",()=>console.log("MongoDB is running"))
      .on("error",(error)=>console.log(error))
}
module.exports=pool;