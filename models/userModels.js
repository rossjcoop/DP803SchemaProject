const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient

const url = "mongodb://localhost:27017/CarClub"

let conn = null


MongoClient.connect(url, function(error, db){

	//checking for errors after trying to connect to the database server
	if (error) {
		console.log("Connection Unsuccessful!");
	}
	else {
		console.log("Connection Successful!");
		conn = db
	}

})


