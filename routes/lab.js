var express = require('express');
var router = express.Router();
var Recording = require("../models/recording");

router.get('lab/status', function(req, res){

    Recording.find({zip: req.body.zip}, {airQuality: req.body.airQuality}, function(err, docs){
        if (zip == ""){
            let errmsg = {"error" : "a zip code is required."};
            res.status(400).send(JSON.stringify(errmsg));
        }
        else if(!zip){
            let errmsg = {"error" : "Zip does not exist in the database."};
            res.status(400).send(JSON.stringify(errmsg));
        }
        else{
            const getAverageAirQuality = async(Recording, zip) => {
                const average = await Recording.aggregate([
                    {$match : {zip: req.body.zip}},
                    {$group: {_id: null, average:{$avg: 'airQuality'}}},
                ]).exec()
                return average;
            };
            res.status(200).json(average);    
        }
    })
});

router.post('lab/register', function(req,res){
    const newRecording = new Recording({
        zip: req.body.zip,
        airQuality: req.body.airQuality
    });

    newRecording.save(function(err, recording){
        if(err){
            var errormsg = {"error" : "zip and airQuality are required."};
            res.status(400).send(JSON.stringify(errormsg))
            return;
        }
        else{
            var msg = {"response" : "Data recorded."};
            res.status(201).send(JSON.stringify(msg));
            return; 
        }
    })
})

module.exports = router;