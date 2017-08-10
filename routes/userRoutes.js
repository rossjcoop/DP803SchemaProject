const express = require('express')
const router = express.Router()
const CarModel = require ('../models/userModels')



////Don't know why, needed this to first land on index
router.get("/", function(req, res, next){
	res.redirect("index")
})


////This renders the first page with all the cars///
router.get("/index", function(req, res, next){
    CarModel.CarModel.find()
      .then(function(cars) {
        res.render("index", {cars: cars})
        })
      .catch(function(error) {
        res.render('index')
      })
})



/////This renders the register page to create account
router.get("/cars", function(req, res, next){
	res.render("cars")
})


//////This takes the info from the registration form and sends it to the data base, redirects to index
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

///This creates the edit form with user's info already populated
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

//This take the new info from the form and saves it to the database
router.post('/submit/:username', function( req, res, next){
	carData = {}

	carData.name = req.body.name
	carData.username = req.body.username
	carData.age = req.body.age
	carData.location = req.body.location
	carData.website = req.body.website
	carData.carpic = req.body.carpic
	carData.year = req.body.year
	carData.make = req.body.make
	carData.model = req.body.model
	carData.trans = req.body.trans

	var query = {'username': carData.username}


	CarModel.CarModel.findOne(query)
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


		data.save()
		.then(function(savedCar){
		res.redirect("/")	
		})
	})
})


////This creates the individual user's page
router.get("/user/:username", function(req, res, next){
	var username = req.params.username
	var query = {"username": username}
	CarModel.CarModel.findOne(query)
	.then(function(data){
		res.render("user", {cars: data})
	})

	
})
/////This deletes the individual user from the database.
router.get("/deleteUser/:username", function(req, res, next){
	var username = req.params.username
	var query = {"username": username}
	CarModel.CarModel.deleteOne(query)
	.then(function(){
		res.redirect("/")
	})
})



module.exports = router