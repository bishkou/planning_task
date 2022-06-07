const express = require('express');
const router = express.Router();

const WorkerService = require('../services/worker')


router.get('/:id', WorkerService.getOne);

router.get('', WorkerService.getAll);

router.post('', WorkerService.addOne);

router.patch('/:id', WorkerService.editOne);

router.delete('/delete/:id', WorkerService.deleteOne);


module.exports = router;
