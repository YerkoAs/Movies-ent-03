require('../models')
const request = require("supertest")
const app = require("../app")
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

const BASE_URL = '/api/v1/movies'
let movieId

const movie = {
    name: 'War of the worlds',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/War_of_the_Worlds_2005_poster.jpg/220px-War_of_the_Worlds_2005_poster.jpg',
    synopsis: 'A narrator opens the film stating that extraterrestrials with immense intelligence have grown envious of humanity s dominion of Earth and are plotting against them.',
    releaseYear: 2005
}
const actor = {
    firstName: 'Agelina',
    lastName: 'Jolie',
    nationality: 'American',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Under_Secretary_Zeya_Meets_With_UNHCR_Special_Envoy_Jolie_%2851942861677%29_%28cropped%29.jpg/220px-Under_Secretary_Zeya_Meets_With_UNHCR_Special_Envoy_Jolie_%2851942861677%29_%28cropped%29.jpg',
    birthday: '1975-08-04'
}
const director = {
    firstName: 'Brian',
    lastName: 'De Palma',
    nationality: 'American',
    image: "https://pics.filmaffinity.com/brian_de_palma-061880816431495-nm_200.jpg",
    birthday:'1940-09-11'
}
const genre = {
    name: 'thriller'
}


test('POST -> BASE_URL, should return statusCode 201, and res.body.name === movie.name', async() => {
    const res = await request(app)
    .post(BASE_URL)
    .send(movie)

    movieId = res.body.id

expect(res.statusCode).toBe(201)
expect(res.body).toBeDefined()
expect(res.body.name).toBe(movie.name)
})

test('GET -> BASE_URL, should retun statusCode 200, and res.body.length === 1', async() => {
    const res = await request(app)
    .get(BASE_URL)

expect(res.statusCode).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(1)
//console.log(res.body)
expect(res.body[0].actors).toBeDefined()
expect(res.body[0].actors).toHaveLength(0)
})

test('GET -> BASE_URL/movieId, should return statusCode 200, and res.body.name === movie.name', async() => {
    const res = await request(app)
    .get(`${BASE_URL}/${movieId}`)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.name).toBe(movie.name)
expect(res.body.actors).toBeDefined()
expect(res.body.actors).toHaveLength(0)
})

test('PUT -> BASE_URL/movieId, should return statusCode 200, and res.body.name === newMovie.name', async() => {
    const newMovie = {
        name: 'Inception'
    }
    const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(newMovie)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.name).toBe(newMovie.name)
})

test('POST -> BASE_URL/movieId/actors, should return statusCode 200, and res.body.length === 1', async() => {
const createActor = await Actor.create(actor)

    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([createActor.id])

expect(res.statusCode).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(1)
     
    await createActor.destroy() 
})

test('POST -> BASE_URL/movieId/directors, should return statusCode 200, and res.body.length === 1', async() => {
    const createDirector = await Director.create(director)
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([createDirector.id])

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(1)

    await createDirector.destroy()
})

test('POST -> BASE_URL/movieId/genres, should return statusCode 200, and res.body.length === 1', async() => {
    const createGenre = await Genre.create(genre)
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([createGenre.id])

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(1)

    await createGenre.destroy()
})

test('DELETE -> BASE_URL/movieId, should return statusCode 204', async() => {
    const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)

expect(res.status).toBe(204)
})