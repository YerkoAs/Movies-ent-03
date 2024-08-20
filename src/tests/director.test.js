require('../models')
const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/actors'
let directorId

const director = {
    firstName: 'Steven',
    lastName: 'Spielberg',
    nationality: 'American',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/MKr25402_Steven_Spielberg_%28Berlinale_2023%29.jpg/800px-MKr25402_Steven_Spielberg_%28Berlinale_2023%29.jpg',
    birthday:'1946-12-18'
}

test('POST -> BASE_URL, should return statusCode 201, and res.body.firstName === director.firstName', async() => {
    const res = await request(app)
    .post(BASE_URL)
    .send(director)

    directorId = res.body.id

expect(res.statusCode).toBe(201)
expect(res.body).toBeDefined()
expect(res.body.firstName).toBe(director.firstName)
})

test('GET -> BASE_URL, should return statusCode 200, and res.body.length === 1', async() => {
    const res = await request(app)
    .get(BASE_URL)

expect(res.status).toBe(200)      
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(1)        
})

test('GET -> BASE_URL/directorId, should return statusCode 200, and res.body.lastName === director.lastName', async() => {
    const res = await request(app)
    .get(`${BASE_URL}/${directorId}`)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.lastName).toBe(director.lastName)
})

test('PUT -> BASE_URL/directorId, should return statusCode 200, and res.body.firstName === newDirector.firstName', async() => {
    const newDirector = {
        firstName: 'Tim'
    }
    const res = await request(app)
      .put(`${BASE_URL}/${directorId}`)
      .send(newDirector)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.firstName).toBe(newDirector.firstName)
})

test('DELETE -> BASE_URL/directorId, should return statusCode 204', async() => {
    const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)

expect(res.statusCode).toBe(204)
})
