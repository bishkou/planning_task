const Shift = require('../models/shift')

const getAll = async (req, res, next) => {
    const shifts = await Shift.find({})
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(200).send(shifts);
}

const getOne = async (req, res, next) => {
    res.send('example working')
}

const addOne = async (req, res, next) => {
    const { name } = req.body;

    const shift = new Shift({
        name
    });

    const savedShift = await shift.save()
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(201).send(savedShift);
}

const editOne = async (req, res, next) => {
    res.send('example working')
}

const deleteOne = async (req, res, next) => {
    res.send('example working')
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