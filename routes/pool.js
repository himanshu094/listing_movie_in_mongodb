const mongoose=require("mongoose")
const pool=()=>{
      mongoose.Promise=global.Promise;
      const options={};

      mongoose.connect(
        `mongodb://localhost:27017/moviedatabase?retryWrites=true&w=majority`,
        options
      );
      mongoose.connection
      .once("open",()=>console.log(MongoDB running);)
      .on("error",(error)=>console.log(error);)

}


module.exports=pool