var express = require('express');
var router = express.Router();
var Admin = require('../model/admin');
var Admin_User=require('../model/admin_user')
// get request for trains details
router.get('/TrainDetails',function(req, res) {
    Admin.find(function(err, details) {
        if (err)
        {
            console.log("Error while fetching train data "+err);
            res.send(err);
        }
        else
        {
            console.log(" train data "+details);
            res.json(details);
        }
    });
});

router.post("/adminlogin",(req, res)=>{
    console.log("in the admin login "+req.body.email);
    var login = Admin_User();
    const body=req.body
    const email=body.email
    const password = body.password
    Admin_User.findOne({email:email,password:password},(err,found)=>{
      if(found){
        console.log("User found in db "+email);
         // routes = "/search";
         res.status(200).json(1);
     }
     else{
        res.status(401).json("Enter valid email and password");
        //console.log("not valid")
 
     }
 });    
});

router.post("/adminlog",(req, res)=>{
    console.log("in the admin login "+req.body.email);
    var login = Admin_User();
    const body=req.body
    const email=body.email
    const password = body.password
    const found =true;
      if(found){
        console.log("User found in db "+email);
         // routes = "/search";
         res.status(200).json(1);
     }
     else{
        res.status(401).json("Enter valid email and password");
        //console.log("not valid")
 
     }
    
});

router.post("/adminRegister",(req, res)=>{
    var login = Admin_User();
    login.email=req.body.email;
    login.password=req.body.password;

    login.save(function(err) {
        if (err)
        {
            console.log("error while admin register "+err);
            res.status(404).send(err);
        }
        else
        {
            console.log("new train detail is added to the database");
            res.status(200).send('new train detail is added to the database');
        }
    });   
});
//post request for train data
router.post('/admin',(req, res)=>{
    var admin=new Admin();
    admin.train_name=req.body.train_name;
    admin.from=req.body.from;
    admin.to=req.body.to;
    admin.fare=req.body.fare;
    admin.date=req.body.date;
    admin.arrival_time=req.body.arrival_time;
    admin.departure_time=req.body.departure_time;
    admin.available=req.body.available;
    console.log("inside admin post");
    // Output to the console for testing
    console.log(admin);
   
   admin.save(function(err) {
    if (err)
    {
        console.log("error while admin register "+err);
        res.send(err);
    }
    else
    {
        console.log("new train detail is added to the database");
        res.send('new train detail is added to the database');
    }
});
});

router.post("/search",(req, res)=>{
    var login = Admin();
    const body=req.body
    const from=body.from
    const to = body.to
    const date = body.date
//if passenger details found or not found
 console.log("from "+from)
 console.log("to "+to)
 console.log("date "+date)
 Admin.find({from:from, to:to ,date:date},(err,found)=>{

     console.log(found);
      if(found){
          console.log("Trains availables"+found);
        res.json(found);
     }
     else{
         res.send("No Trains Found");
     }
 });    

})
 router.get('/booking/:id',  function(req, res) {
	console.log("id is :"+req.params.id)
	 Admin.findById(req.params.id).then((train)=>{
        if(train){
           res.json(train);
        }else{
            res.send("invalid train id");
                }
    });

});
router.get('/trains/:id',  function(req, res) {
	console.log("id is :"+req.params.id)
	 Admin.findById(req.params.id).then((train)=>{
        if(train.train_name){
           res.json(train);
        }else{
            res.send("invalid train id");
                }
    });

});

router.delete('/trains/:_id', function(req, res) {
	console.log(req.params._id);
	let id = req.params._id;
	Admin.deleteOne({
		_id : id
	}, function(err) {
		if (err){
            console.log("error inside delete");
			res.send(err);
        }
		else{
			res.send('Successfully! Train has been Deleted.');
            console.log("successful delete");	
        }
	});
});
router.post("/trainsearch",(req, res)=>{
    var login = Admin();
    const body=req.body
    const from=body.from
    const to = body.to
    const date = body.date
 Admin.find({from:from, to:to ,date:date},(err,found)=>{
      if(found.length>0){
          console.log("data found"+found);
         res.json(found);
     }
     else{
         res.send({
                msg:"not"});
     }
 });    
})
router.use('/api', router);
module.exports = router;
