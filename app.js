const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser')


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', userRoutes)


app.listen(3000, function(){
  console.log("App running on port 3000")
})