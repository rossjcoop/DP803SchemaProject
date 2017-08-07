const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = "mongodb://localhost:27017/CarClub"

mongoose.connect(url);

let conn = null


MongoClient.connect(url, function(error, db){
	if (error) {
		console.log("Connection Unsuccessful!");
	}
	else {
		console.log("Connection Successful!");
		conn = db
	}
})

const carSchema = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	carpic: {type: String},
	name: {type: String},
	age: {type: Number},	
	location: {type: String},
	website: {type: String},	
	carpic: {type: String},
	year: {type: Number},
	make: {type: String},
	model: {type: String},
	transmission: {type: String},
	engine: {type: String}	
})

const CarModel = mongoose.model('car', carSchema);




function addEntry(newCar, cb){
	var car = new CarModel(newCar)
	car.save()
	.then(function(){
	cb(car);
	})
	.catch(function(error){
	console.log("Car not saved!", error)
	cb();
	})


}

function viewEntries(cb){
	CarModel.findMany({})
	.then(function(cars){
		cb(cars)
	})
	.catch(function(error){;
		console.log("error", error);
		cb(null)
		})
}



function delEntries(cb){
	////figure this out last///
}


module.exports = {
	CarModel: CarModel,
	addEntry: addEntry
}


