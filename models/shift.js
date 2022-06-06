const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Shift = new Schema({
    work_date: {type: Date, default: Date.now()},
    day_shifts: {type: Array, default: [false, false, false]},
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    }

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

module.exports = mongoose.model('Shift', Shift);
