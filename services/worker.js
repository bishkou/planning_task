const Worker = require('../models/worker')

const getAll = async (req, res, next) => {
    const workers = await Worker.find({}).populate('shifts')
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(200).send(workers);
}

const getOne = async (req, res, next) => {
    const { id } = req.params;
    const worker = await Worker.findById( id).populate('shifts')
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(200).send(worker);
}

const addOne = async (req, res, next) => {
    const { name } = req.body;

    const worker = new Worker({
        name
    });

    const savedWorker = await worker.save()
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(201).send(savedWorker);
}

const editOne = async (req, res, next) => {
    res.send('example working')
}

const deleteOne = async (req, res, next) => {
    const { id } = req.params;
    const deletedWorker = await Worker.findByIdAndDelete(id)
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(200).send(deletedWorker);
}

const deleteAll = async (req, res, next) => {

    const deletedWorkers = await Worker.deleteMany({})
        .catch((err) => {
            res.status(400).json({errors: [{ message: err.message}]})
        });
    res.status(200).send(deletedWorkers);
}

module.exports = {
    getAll,
    getOne,
    addOne,
    editOne,
    deleteOne,
    deleteAll
}