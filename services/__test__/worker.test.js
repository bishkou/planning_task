const mongoose = require('mongoose')
const app = require('../../app')
const request = require('supertest')
const Worker = require("../../models/worker");

const createWorker = async () => {
    const worker = new Worker({
        _id: mongoose.Types.ObjectId().toHexString(),
        name: 'tata'
    });
    await worker.save();

    return worker;
}

it('fetches all the workers', async () => {
    await createWorker();
    await createWorker();
    await createWorker();
    await createWorker();

    const response = await request(app)
        .get('/api/worker')
        .expect(200);

    expect(response.body.length).toEqual(4);


})

it('fetchs a worker', async () => {
    const worker = await createWorker();

    await request(app)
        .post(`/api/worker`)
        .send({ name: worker.name })
        .expect(201);

    const response = await request(app)
        .get(`/api/worker/${worker._id}`)
        .send()
        .expect(200)

    expect(response.body.id).toEqual(worker._id.toHexString());


});

it('adds a worker', async () => {
    const worker = await createWorker();

    await request(app)
        .post('/api/worker')
        .send({ name: worker.name })
        .expect(201);
});

it('edits a worker', async () => {
    const worker = await createWorker();

    await request(app)
        .post('/api/worker')
        .send({ name: worker.name })
        .expect(201);

    await request(app)
        .patch(`/api/worker/${worker._id}`)
        .send({ name: 'momo'})
        .expect(200)

    const response = await request(app)
        .get(`/api/worker/${worker._id}`)
        .send()
        .expect(200)

        expect(response.body.name).toEqual('momo')
});


it('deletes a worker', async () => {
    const worker = await createWorker();

    await request(app)
        .post('/api/worker')
        .send({ name: worker.name })
        .expect(201);

    await request(app)
        .delete(`/api/worker/delete/${worker._id}`)
        .send({})
        .expect(200)

    const response = await request(app)
        .get(`/api/worker/${worker._id}`)
        .send()
        .expect(200)

    expect(response.body).toEqual({})
});