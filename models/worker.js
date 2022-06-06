const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Worker = new Schema({
    name: {type: String, default: ''},
    shifts: [{
        type: Schema.Types.ObjectId,
        ref: 'Shift'
    }]

    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    });

module.exports = mongoose.model('Worker', Worker);
