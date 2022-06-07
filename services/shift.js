const Shift = require('../models/shift')
const Worker = require('../models/worker')

//Gets All shift regardless of the worker
const getAll = async (req, res, next) => {
    const shifts = await Shift.find({})
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(200).send(shifts);
}

//Gets all the shifts that belong to one Worker
const getAllByWorker = async (req, res, next) => {
    const { id } = req.params;

    const shifts = await Shift.find({worker: id})
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(200).send(shifts);
}

const getOne = async (req, res, next) => {
    const { id } = req.params;
    const shift = await Shift.findById(id)
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(200).send(shift);
}

const addOne = async (req, res, next) => {
    let { day_shifts, work_date, worker_id, is_holiday, is_weekend } = req.body;

    //if its a free day, there shouldnt be any shift
    if (is_holiday || is_weekend)
        day_shifts = [false, false, false];

    //checks if the day_shifts doesnt have more than one true element
    if (day_shifts){
        let counter = 0;
        for (day_shift of day_shifts) {
            if (day_shift) {
                counter++;
                if (counter > 1)
                    return res.status(400).json({errors: [{ message: 'A worker can only have one Shift a day'}]})
            }
        }
    }

    const shift = new Shift({
        day_shifts,
        work_date,
        worker: worker_id,
        is_holiday,
        is_weekend
    });

    const savedShift = await shift.save()
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });

    if (!savedShift)
        res.status(400).json({errors: [{ message: 'Shift wasnt saved successfully' }]})

    //adds shift id to the worker
    await Worker.updateOne({_id: worker_id}, {
        $push: { shifts : savedShift}
    })
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });

    res.status(201).send(savedShift);
}

const editOne = async (req, res, next) => {
    let { worker_id, day_shifts, is_weekend, is_holiday } = req.body
    const { id } = req.params;

    //if its a free day, there shouldnt be any shift
    if (is_holiday || is_weekend)
        day_shifts = [false, false, false];

    //checks if the day_shifts doesnt have more than one true element
    if (day_shifts){
        let counter = 0;
        for (day_shift of day_shifts) {
            if (day_shift) {
                counter++;
                if (counter > 1)
                    return res.status(400).json({errors: [{ message: 'A worker can only have one Shift a day'}]})
            }
        }
    }

    await Shift.findOneAndUpdate({_id: id, worker: worker_id}, {
        day_shifts,
        is_holiday,
        is_weekend
    })
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });

    res.status(200).send('Shift updated successfully');
}

const deleteOne = async (req, res, next) => {
    const { id } = req.params;

    const shift = await Shift.findById(id)
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });

    //deletes the shift from the list of shifts related to the worker
    await Worker.findOneAndUpdate({_id: shift.worker}, {
        $pull: {shifts: id}
    }).catch((err) => {
        res.status(400).json({errors: [{ message: err.message}]})
    });


    const deletedShift = await Shift.findByIdAndDelete(id)
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(200).send(deletedShift);
}

module.exports = {
    getAll,
    getAllByWorker,
    getOne,
    addOne,
    editOne,
    deleteOne
}