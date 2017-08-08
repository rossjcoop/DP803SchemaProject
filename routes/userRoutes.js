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
router.get('/edit/:username', function(req, res, next){

	var username = req.params.username

	var query = {"username": username}


	CarModel.CarModel.findOne(query)
	.then(function(data){
		res.render("editform", data)
	})
	.catch(function(error){
		res.render("editform")
		console.log("error", error)
	})

})


router.post('/submit/:username', function( req, res, next){
	carData = {}

	carData.name = req.body.name
	carData.username = req.body.username
	carData.age = req.body.username
	carData.location = req.body.location
	carData.website = req.body.website
	carData.carpic = req.body.carpic
	carData.year = req.body.year
	carData.make = req.body.make
	carData.model = req.body.model
	carData.trans = req.body.trans

	var query = {'username': cardata.username}


	CarModel.CarModel.updateOne(query)
		.then(function(data){
			data.name = carData.name
			data.username = carData.username
			data.age = carData.age
			data.location = carData.location
			data.website = carData.website
			data.carpic = carData.carpic
			data.year = carData.year
			data.make = carData.make
			data.model = carData.model
			data.trans = carData.trans
		})

	res.redirect("/")



})



router.get("/user/:username", function(req, res, next){
	var username = req.params.username
	var query = {"username": username}
	CarModel.CarModel.findOne(query)
	.then(function(data){
		res.render("user", {cars: data})
	})

	
})



module.exports = router