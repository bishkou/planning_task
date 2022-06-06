const Shift = require('../models/shift')

const getAll = async (req, res, next) => {
    const shifts = await Shift.find({})
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

    if (is_holiday || is_weekend)
        day_shifts = [false, false, false];

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
        worker: worker_id
    });

    const savedShift = await shift.save()
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });

    if (!savedShift)
        res.status(400).json({errors: [{ message: 'Shift wasnt saved successfully' }]})

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

    if (is_weekend || is_holiday){
        day_shifts = [false, false, false];
    }

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

const deleteAll = async (req, res, next) => {

    const deletedShifts = await Shift.deleteMany({})
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(200).send(deletedShifts);
}

module.exports = {
    getAll,
    getOne,
    addOne,
    editOne,
    deleteOne,
    deleteAll
}