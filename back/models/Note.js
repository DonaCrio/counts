'use strict';
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    object: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        require: true
    },
    comment: {
        type: String
    },
    contributors: {
        type: [
            {
                id: String,
                amount: Number
            }
        ]
    },
    indebteds: {
        type: [
            {
                id: String,
                amount: Number
            }
        ]
    },
    creationDate: Date,
    updateDate: Date,
    picture: String
});

NoteSchema.methods.isValid = function() {
    let contributions = 0;
    let debts = 0;
    for(let contributor of this.contributors) {
        contributions += contributor.amount;
    }
    for(let indebted of this.indebteds) {
        debts += indebted.amount;
    }
    if(contributions === this.amount && debts === this.amount) {
        return true;
    } else {
        return false;
    }
}

NoteSchema.statics.update = function(id, update, callback) {
    Note.findById(id, (err, oldNote) => {
        if(err) {
            return callback(err);
        } else {
            Note.findByIdAndUpdate(id, update, {new:true}, (err, newNote) => {
                if(err) {
                    return callback(err);
                } else {
                    if(newNote.isValid()) {
                        return callback(null, newNote);
                    } else {
                        Note.findByIdAndUpdate(id, oldNote, {new:true}, (err, note) => {
                            if(err) {
                                return callback(err);
                            } else {
                                return callback(null, note);
                            }
                        });
                    }
                }
            })
        }
    });
};

let Note = mongoose.model('Note',NoteSchema);
module.exports = Note;