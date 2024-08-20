require('../models')
const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/actors'
const actor = {
    firstName: 'Thomas',
    lastName: 'Cruise',
    nationality: 'American',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg/220px-Tom_Cruise_by_Gage_Skidmore_2.jpg',
    birthday: '1962-07-03'
}

let actorId


test('POST -> BASE_URL, should return statusCode 201, and res.body.firstName === actor.firstName', async() => {
    const res = await request(app)
    .post(BASE_URL)
    .send(actor)

    actorId = res.body.id

expect(res.statusCode).toBe(201)
expect(res.body).toBeDefined()
expect(res.body.firstName).toBe(actor.firstName)
})

test('GET -> BASE_URL, should retun statusCode 200, and res.body.length === 1', async() => {
    const res = await request(app)
    .get(BASE_URL)

expect(res.statusCode).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(1)
})

test('GET -> BASE_URL/actorId, should return statusCode 200, and res.body.firstName === actor.firstName', async() => {
    const res = await request(app)
    .get(`${BASE_URL}/${actorId}`)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.firstName).toBe(actor.firstName)
})

test('PUT -> BASE_URL/actorId, should return statusCode 200, and res.body.firstName === newActor.firstName', async() => {
    const newActor ={
        firstName: 'Michael'
    }
    const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(newActor)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.firstName).toBe(newActor.firstName)
})

test('DELETE -> BASE_URL/actorId, should return statusCode 204', async() => {
    const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

expect(res.status).toBe(204)
})