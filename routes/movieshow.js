var express = require('express');
var router = express.Router();
const upload=require('./multer');
const fs=require("fs");
const LocalStorage=require('node-localstorage').LocalStorage;
      localStorage=new LocalStorage('./scratch');
const State=require("./model/stateModel.js");
const City=require("./model/cityModel.js");
const Movie=require("./model/moviesModel.js");
const Cinema=require("./model/cinemaModel.js");
const Screen=require("./model/screenModel.js");

/* GET movielisting page. */
router.get("/createschema",function(req,res){
  const ST=new State();
  const CT=new City();
  const MO=new Movie(); 
  const CN=new Cinema();
  const SC=new Screen();
  res.send("Created")
})

router.get('/listyourshow', function(req, res, next) {
      res.render('movielisting',{message:''});
});

router.get('/fetch_state',function(req,res){
  State.find({}).then((result)=>{
    res.json({result:result})
  }).catch((e)=>{
    res.json({result:e})
  })
})

router.get('/fetch_city',function(req,res){
    City.find({"stateid._id":req.query.stateid}).then((result)=>{
      res.json({result:result})
    }).catch((e)=>{
      res.json({result:e})
    })
})

router.get('/fetch_cinema',function(req,res){
  Cinema.find({}).then((result)=>{
    res.json({result:result})
  }).catch((e)=>{
    res.json({result:e})
  })
})

router.get('/fetch_screen',function(req,res){
  Screen.find({"cinemaid._id":req.query.cinemaid}).then((result)=>{
    res.json({result:result})
  }).catch((e)=>{
    res.json({result:e})
  })
})

router.post('/datasubmited',upload.single('poster'),function(req,res){
  try{
    console.log("DATA:",req.body);
    console.log("file Data:",req.file);
    const body={...req.body,poster:req.file.filename}
    console.log("movie all submited Data:",body);
    const movie=new Movie(body);
    movie.save().then((savedData)=>{
      if(movie==savedData)
      {
        res.render("movielisting",{messge:"submitted Successfully"});
      }
      else
      {
        res.render("movielisting",{message:"Database Error"}); 
      }
    })

  }
  catch(e)
  {
    console.log("Error:",e);
    res.render("movielisting",{message:'Server Error'}); 
  }
})

/*
// !done
router.get('/listyourshow', function(req, res, next) {
  try{
    var admin=JSON.parse(localStorage.getItem('ADMIN'));
    if(admin==null || admin==undefined)
    {
      res.render('loginpage',{message:''})
    }
    else
    {
      res.render('movielisting',{message:''});
    }
  }
  catch(e)
  {
    res.render("loginpage",{message:''})
  }
});

// !done
router.post('/datasubmited',upload.single('poster'),function(req,res){
  try{
    console.log("DATA:",req.body);
    console.log("file Data:",req.file);
    pool.query("insert into movies (stateid, cityid, cinemaid, screenid, moviename, description, status, poster) values(?,?,?,?,?,?,?,?)",
    [req.body.stateid, req.body.cityid, req.body.cinemaid, req.body.screenid, req.body.moviename, req.body.description, req.body.status, req.file.filename],function(error,result){
      if(error)
      {
        console.log("D Error",error);
        res.render("movielisting",{message:'workbanch Database Error'})
      }
      else
      {
        res.render("movielisting",{message:'Product Submitted Successfully',val:2})  
      }
    })
  }
  catch(e)
  {
    console.log("Error:",e);
    res.render("movielisting",{message:'Server Error'}) 
  }
})

// !done
router.get('/fetch_state',function(req,res){
  try{
    pool.query('select * from state',function(error,result){
      if(error)
      {
        console.log('Database error',error);
        res.status(200).json([]);
      }else{
        res.status(200).json({result:result});
      }
    })
  }
  catch(e)
  {
    console.log("Server Error",e);
    res.render("movielisting",{message:'server error'})
  }
})

// !done
router.get('/fetch_city',function(req,res){
  try{
    pool.query('select * from city where stateid=?',[req.query.stateid],function(error,result){
      if(error)
      {
        console.log('Database error',error);
        res.status(200).json([]);
      }else{
        res.status(200).json({result:result});
      }
    })
  }
  catch(e)
  {
    console.log("Server Error",e);
    res.render("movielisting",{message:'server error'})
  }
})

// !done
router.get('/fetch_cinema',function(req,res){
  try{
    pool.query('select * from cinema',function(error,result){
      if(error)
      {
        console.log('Database error',error);
        res.status(200).json([]);
      }else{
        res.status(200).json({result:result});
      }
    })
  }
  catch(e)
  {
    console.log("Server Error",e);
    res.render("movielisting",{message:'server error'})
  }
})

// !done
router.get('/fetch_screen',function(req,res){
  try{
    pool.query('select * from screen where cinemaid=?',[req.query.cinemaid],function(error,result){
      if(error)
      {
        console.log('Database error',error);
        res.status(200).json([]);
      }else{
        res.status(200).json({result:result});
      }
    })
  }
  catch(e)
  {
    console.log("Server Error",e);
    res.render("movielisting",{message:'server error'})
  }
})

router.get("/fetch_all_show",function(req,res){
  try{
    var admin=JSON.parse(localStorage.getItem('ADMIN'));
    if(admin==null || admin==undefined)
    {
      res.render('loginpage',{message:''})
    }
    pool.query('select M.*,(select S.statename from state S where S.stateid=M.stateid) as statename, (select C.cityname from city C where C.cityid=M.cityid) as cityname,(select CI.cinemaname from cinema CI where CI.cinemaid=M.cinemaid) as cinemaname,(select CI.cinemalogo from cinema CI where CI.cinemaid=M.cinemaid) as cinemalogo,(select SC.screenname from screen SC where SC.screenid=M.screenid) as screenname from movies M',function(error,result){
      if(error){
        console.log("Dabase Error",error);
        res.render('displayallshow',{data:[],message:'database error'})
      }else{
        // console.log("Dabase result",result);
        res.render('displayallshow',{data:result})
      }

    })
  }
  catch(e)
  {
    console.log("Error",e);
    req.render("loginpage",{data:[],message:'server error'})
  }
})

router.get("/displayforedit",function(req,res){
  try{
    pool.query('select M.*,(select S.statename from state S where S.stateid=M.stateid) as statename, (select C.cityname from city C where C.cityid=M.cityid) as cityname,(select CI.cinemaname from cinema CI where CI.cinemaid=M.cinemaid) as cinemaname,(select CI.cinemalogo from cinema CI where CI.cinemaid=M.cinemaid) as cinemalogo,(select SC.screenname from screen SC where SC.screenid=M.screenid) as screenname from movies M where M.movieid=?',[req.query.movieid],function(error,result){
      if(error){
        console.log("Dabase Error",error);
        res.render('displayforedit',{data:[],message:'database error'})
      }else{
        // console.log("Dabase result",result);
        res.render('displayforedit',{data:result[0],message:'Success'})
      }

    })
  }
  catch(e)
  {
    console.log("Error",e);
    req.render("displayforedit",{data:[],message:'server error'})
  }
})

router.post('/edit_movie',function(req,res){
  try{
    pool.query("update movies set stateid=?, cityid=?, cinemaid=?, screenid=?, moviename=?, description=?, status=? where movieid=?",
    [req.body.stateid, req.body.cityid, req.body.cinemaid, req.body.screenid, req.body.moviename, req.body.description, req.body.status,req.body.movieid],function(error,result){
      if(error)
      {
        console.log("D Error",error);
        res.redirect('/movie/fetch_all_show');
      }
      else
      {
        res.redirect('/movie/fetch_all_show'); 
      }
    })
  }
  catch(e)
  {
    console.log("Error:",e);
    res.redirect('/movie/fetch_all_show')
  }
})

router.get('/delete_show',function(req,res){
  try{
    pool.query("delete from movies where movieid=?", [req.query.movieid],function(error,result){
      if(error)
      {
        console.log("D Error",error);
        res.redirect('/movie/fetch_all_show');
      }
      else
      {
        res.redirect('/movie/fetch_all_show'); 
      }
    })
  }
  catch(e)
  {
    console.log("Error:",e);
    res.redirect('/movie/fetch_all_show')
  }
})

router.get("/display_poster_for_edit",function(req,res){
  res.render("displayposterforedit",{data:req.query})
})


router.post('/edit_poster',upload.single('movieposter'),function(req,res){
  try{
    pool.query("update movies set poster=? where movieid=?", [req.file.filename,req.body.movieid],function(error,result){
      if(error)
      {
        console.log("D Error",error);
        res.redirect('/movie/fetch_all_show');
      }
      else
      { 

        fs.unlinkSync(`public/images/${req.body.oldfilename}`)
        res.redirect('/movie/fetch_all_show'); 
      }
    })
  }
  catch(e)
  {
    console.log("Error:",e);
    res.redirect('/movie/fetch_all_show')
  }
})
*/

module.exports = router;
