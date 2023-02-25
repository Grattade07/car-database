const express = require("express")

const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true }))

app.use(bodyParser.json())

app.use(express.static("car-database/build"))

/* set server to listen to port 8000 */
const PORT = process.env.PORT || 3001

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
})

/* imports mongoose */
const mongoose = require("mongoose")

/* url to connect to database */
const uri = "mongodb+srv://joe_woodcock15:Sp2m3gURNTNAELJi@hyperiondev-t55.98pyee9.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

/* connects to the database */
mongoose.connect(uri, {
    /* useMongoClient: true, */
    dbName: "Cars"
})

/* displays message when database connection is successful */
mongoose.connection.once("open", function () {
    console.log("Successfully connected to database")
})


/* displays message if connection to database could not be made and connection process is ended */
mongoose.connection.on("error", function() {
    console.log("Could not connect to database. Exiting now...")
    process.exit()
})

const cars = require("./controllers/car.controller.js")

/* Learned how to call model controllers from url: https://restful-api-node-typescript.books.dalenguyen.me/en/latest/using-controller-and-model.html */

/* calls find all controller for the cars collection */
app.get("/api", cars.findAll)

/* creates new car when post request is received */
app.post("/addCar", cars.create)

/* updates the owner of the specified car */
app.put("/updateCar", cars.updateOneByRegistration)

/* updates the make of cars for a specific owner */
app.put("/updateCars", cars.updateAllMakeOfOwner)

/* deletes the car with the specified registration */
app.delete("/removeCar", cars.deleteCar)

app.get("/get5YearOldCars", cars.findCarsOlderThan5)