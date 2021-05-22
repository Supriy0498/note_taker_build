const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
});
const Note = mongoose.model("note",NoteSchema);
module.exports = {Note,NoteSchema};