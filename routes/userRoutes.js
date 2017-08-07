const express = require('express')
const router = express.Router()
const CarModel = require ('../models/userModels')




router.get("/", function(req, res, next){
	res.redirect("index")
})



router.get("/index", function(req, res, next){
    CarModel.CarModel.find()
      .then(function(cars) {
        res.render("index", {cars: cars})
        })
      .catch(function(error) {
        res.render('index')
      })
})




router.get("/cars", function(req, res, next){
	res.render("cars")
})



router.post("/cars", function(req, res, next){
	var inputData = {
		name: req.body.name,
		username: req.body.username,
		age: req.body.age,
		location: req.body.location,
		website: req.body.website,
		carpic: req.body.carpic,
		year: req.body.year,
		make: req.body.make,
		model: req.body.model,
		transmission: req.body.trans,
		engine: req.body.engine
	};


	CarModel.addEntry(inputData, function(data){
	res.render("cars");
	})


	res.redirect("index")
	
})



////to edit


//1. New Route to render eit form with informaton from the request.
////2. New mustache template to display edit form populated with specific information
//3. New Route to take edit form submission and save smurf changes to the database
app.get('/edit/:username', function(req, res, next){

	var username = req.params.username

	var query = {"username": username}


	Carmodel.Carmodel.findOne(query)
	.then function(data){
		res.render{"edit", data}
	}
	.catch function(error){
		res.render{"edit"}
		console.log("error", error)
	}

})


app.post('/edit/submit', function( req, res, next){
	cardata = {}

	data.name = req.body.name
	data.username = req.body.username
	data.age = req.body.username
	data.location = req.body.location
	data.website = req.body.website
	data.carpic = req.body.carpic
	data.year = req.body.year
	data.make = req.body.make
	data.model = req.body.model
	data.trans = req.body.trans




})



module.exports = router