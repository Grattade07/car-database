/* Controller for the CarSchema model */

const Car = require("../models/car.js")

/* creates new car document  */
exports.create = function(req, res) {
    let carModel = new Car({
        model: req.body.model,
        make: req.body.make,
        owner: req.body.owner,
        registration: req.body.registration
    })

        carModel.save(function (err,data) {
            if(err) {
                console.log(err)
                res.status(500).send({message: "Some error occurred while creating the car"})
            }
            else {
                console.log(data)
                res.send("The car has been successfully added")
            }
        })
}

/* finds all documents in the cars collection */
exports.findAll = function(req, res) {
    Car.find(function(err, cars) {
        if(err) {
            console.log(err)
            res.status(500).send({message: "Some error occured while retrieving the car list"})
        }
        else {
            res.send(cars)
        }
    })
}

/* updates the owner of a car from the given registration */
exports.updateOneByRegistration = function (req, res) {
    Car.updateOne({registration: `${req.body.registration}`}, {$set: {owner: `${req.body.owner}`}}, {}, function(err, doc) {
        if(err) {
            console.log("Something went wrong updating the car")
        }

        res.send("Car Updated")
    })
}

/* updates the makes of cars for specific owner */
exports.updateAllMakeOfOwner = function (req, res) {
    Car.updateMany({owner: `${req.body.owner}`}, {$set: {make: `${req.body.make}`}}, {}, function(err, doc) {
        if(err) {
            res.send("Something went wrong updating the cars")
        }

        res.send("Cars updated")
    })
}

/* deletes the car with the specified registration */
exports.deleteCar = function (req, res) {
    Car.deleteOne({registration: `${req.body.registration}`}, {}, function(err,doc) {
        if(err) {
            res.send("Something went wrong deleting the car")
        }

        res.send("Car deleted")
    })
}

/* finds all cars older than 5 years old */
exports.findCarsOlderThan5 = function (req, res) {
    Car.find({model: {$lt: 2018}}, function(err, cars) {
        if(err) {
            console.log(err)
            res.status(500).send({message: "Some error occured while retrieving the car list"})
        }
        else {
            res.send(cars)
        }
    })
}
