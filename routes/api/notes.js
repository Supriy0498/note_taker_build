const express = require("express");
const {Note,NoteSchema} = require("../../models/Note.js");
const {Topic,TopicSchema} = require("../../models/Topic.js");
const router = express.Router();


// route    ->  /api/topic/:topicName/notes
// method   ->  GET
router.get("/:topicName/notes",(req,res)=>{
    Topic.findOne({name:req.params.topicName},(err,topic)=>{
        if(err) res.send(err);

        res.json(topic);
    });
});

// route    ->  /api/topic/:topicName/notes
// method   ->  POST
router.post("/:topicName/notes",(req,res)=>{
    const topicName =String(req.params.topicName).toLowerCase();
    const noteTitle = String(req.body.title).trim();
    const noteContent = String(req.body.content).trim();
    const note = new Note({
        title:noteTitle,
        content:noteContent
    });
    Topic.findOneAndUpdate({name:topicName},{"$push":{"notes":note}},(err,topic)=>{
        if(err){
            console.log(err);
        }
        else{
            if(topic)
                res.send("note added");
            else{
                const newTopic = new Topic({
                    name:topicName,
                    notes:[note]
                });

                newTopic.save()
                    .then(topic=>res.send(topic))
                    .catch(err=>res.send(err));
            }
        }
    });


});

// route    ->  /api/topic/:topicName/notes/:id
// method   ->  DELETE
router.delete("/:topicName/notes/:id",(req,res)=>{
    Topic.findOne({name:req.params.topicName},(err,topic)=>{
        if(err) res.send(err);
        else if(!topic) res.send("This topic has no notes")
        else{
            
            const id = req.params.id;
            console.log("here "+id);
            var notes =topic.notes;
            notes = notes.filter(note=>note.id!=id)
            Topic.updateOne({name:topic.name},{notes:notes},(err)=>{
                if(err) res.send(err);
                else{
                    res.send("topic notes updated")
                }
            });
            //res.json(notes);
        }
    });
});
module.exports = router;