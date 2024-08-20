require('../models')
const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/genres'
const genre = {
    name: 'Action'
}

let genreId


test('POST -> BASE_URL, should return statusCode 201, and res.body.name === genre.name', async() => {
    const res = await request(app)
    .post(BASE_URL)
    .send(genre)

    genreId = res.body.id

expect(res.statusCode).toBe(201)
expect(res.body).toBeDefined()
expect(res.body.name).toBe(genre.name)
})

test('GET -> BASE_URL, should retun statusCode 200, and res.body.length === 1', async() => {
    const res = await request(app)
    .get(BASE_URL)

expect(res.statusCode).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(1)
})

test('GET -> BASE_URL/genreId, should return statusCode 200, and res.body.name === genre.name', async() => {
    const res = await request(app)
    .get(`${BASE_URL}/${genreId}`)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.name).toBe(genre.name)
})

test('PUT -> BASE_URL/genreId, should return statusCode 200, and res.body.name === newGenre.name', async() => {
    const newGenre ={
        name: 'Comedy'
    }
    const res = await request(app)
    .put(`${BASE_URL}/${genreId}`)
    .send(newGenre)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.name).toBe(newGenre.name)
})

test('DELETE -> BASE_URL/genreId, should return statusCode 204', async() => {
    const res = await request(app)
    .delete(`${BASE_URL}/${genreId}`)

expect(res.status).toBe(204)
})