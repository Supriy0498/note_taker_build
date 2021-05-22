const mongoose = require("mongoose");
const {NoteSchema} = require("./Note");
const TopicSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    notes:{
        type:[NoteSchema]
    }
});
const Topic = mongoose.model("topic",TopicSchema);
module.exports = {Topic,TopicSchema};