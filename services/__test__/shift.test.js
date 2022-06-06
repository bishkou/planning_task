const mongoose = require('mongoose')
const app = require('../../app')
const request = require('supertest')
const Worker = require("../../models/worker");
const Shift = require("../../models/shift");

const createWorker = async () => {
    const worker = new Worker({
        _id: mongoose.Types.ObjectId().toHexString(),
        name: 'tata'
    });
    await worker.save();

    return worker;
}

const createShift = async (day_shifts, work_date, worker_id, is_holiday, is_weekend) => {
    const shift = new Shift({
        _id: mongoose.Types.ObjectId().toHexString(),
        day_shifts,
        work_date,
        worker: worker_id,
        is_holiday,
        is_weekend
    });
    await shift.save();

    return shift;
}

it('fetches all the shifts for a worker', async () => {
    const worker = await createWorker();
    await createShift([true,false,false], '2021-06-06', worker._id, false, false);
    await createShift([true,false,false], '2021-06-04', worker._id, false, false);
    await createShift([false,true,false], '2021-06-09', worker._id, false, false);


    const response = await request(app)
        .get(`/api/shift/all/${worker._id}`)
        .expect(200);

    expect(response.body.length).toEqual(3);


})

it('adds a shift to a worker', async () => {

    const worker = await createWorker();
    const shift = await createShift([true,false,false], '2021-06-06', worker._id, false, false);

    const newShift = await request(app)
        .post('/api/shift')
        .send({
            worker_id: worker._id,
            work_date: shift.work_date,
            day_shifts: shift.day_shifts,
            is_holiday: shift.is_holiday,
            is_weekend: shift.is_weekend
        })
        .expect(201);


    const response = await request(app)
        .get(`/api/worker/${worker._id}`)
        .send({})
        .expect(200);
    expect(response.body.shifts[0].id).toEqual(newShift.body.id)

});

it('return a 400 for having 2 shifts in a day a shift to a worker', async () => {

    const worker = await createWorker();
    const shift = await createShift([true,true,false], '2021-06-06', worker._id, false, false);

    await request(app)
        .post('/api/shift')
        .send({
            worker_id: worker._id,
            work_date: shift.work_date,
            day_shifts: shift.day_shifts,
            is_holiday: shift.is_holiday,
            is_weekend: shift.is_weekend
        })
        .expect(400);
});