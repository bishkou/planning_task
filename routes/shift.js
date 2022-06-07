const express = require('express');
const router = express.Router();

const ShiftService = require('../services/shift')


router.get('/:id', ShiftService.getOne);

router.get('/all/:id', ShiftService.getAllByWorker);

router.get('', ShiftService.getAll);

router.post('', ShiftService.addOne);

router.patch('/:id', ShiftService.editOne);

router.delete('/delete/:id', ShiftService.deleteOne);

module.exports = router;
