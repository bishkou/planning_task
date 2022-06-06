const mongoose = require('mongoose')
const app = require('../../app')
const request = require('supertest')
const Worker = require("../../models/worker");



it('returns an error if the ticket is already reserved', async () => {
    const worker = new Worker({
        _id: mongoose.Types.ObjectId().toHexString(),
        name: 'tata'
    });
    await worker.save();

    await request(app)
        .post('/api/worker')
        .send({ name: worker._id })
        .expect(201);
});