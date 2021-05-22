const express = require("express");
const {Topic} = require("../../models/Topic.js");
const router = express.Router();

// route    /api/topics
// method   GET
router.get("/",(req,res)=>{
    Topic.find((err,topics)=>{
        if(err) res.send(err);
        var topicList = [];
        topics.forEach(topic=>topicList.push(topic.name));
        res.json(topicList);
    });
});

// route    /api/topics
// method   POST
router.post("/",(req,res)=>{
    //res.header("Access-Control-Allow-Origin", "*");

    const topicName = String(req.body.topic).trim().toLowerCase();

    Topic.findOne({name:topicName},(err,topic)=>{
        if(err)console.log(err);
        else if(topic){
            res.send("Topic already exists");
        }
        else{
            const newTopic = new Topic({
                name:topicName,
                notes:[]
            });
        
            newTopic.save()
                .then(topic=>res.status(200).send("topic added"))
                .catch(err=>res.send(err));
        }
    });
});

module.exports = router;