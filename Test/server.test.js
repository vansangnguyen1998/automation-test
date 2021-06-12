/**
 * File: \server.test.js
 * Project: puppet-test
 * Created Date: Saturday, June 12th 2021, 4:52:36 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Saturday, June 12th 2021, 6:29:25 pm
 * Modified By: Văn Sang
 * ------------------------------------
 */

const { randStr } = require('./util')
const axios = require('axios').default

const api = 'http://localhost:3002/api'

test('GET /authors', async () => {
  const page = 2
  const limit = 10
  
  const response = await axios.get(`${api}/authors`, { params: { page, limit }})

  expect(response.status).toEqual(200)
  
  expect(response.data.page).toEqual(page)
  expect(response.data.limit).toEqual(limit)
})

test('GET /books', async () => {
  const page = 2
  const limit = 10
  
  const response = await axios.get(`${api}/books`, { params: { page, limit }})

  expect(response.status).toEqual(200)
  
  expect(response.data.page).toEqual(page)
  expect(response.data.limit).toEqual(limit)
})

test('GET /publishers', async () => {
  const page = 2
  const limit = 10
  
  const response = await axios.get(`${api}/publishers`, { params: { page, limit }})

  expect(response.status).toEqual(200)
  
  expect(response.data.page).toEqual(page)
  expect(response.data.limit).toEqual(limit)
  // expect(response.data.docs).toBeCalledWith(expect.any(Array))
})

test('GET /authors/{_id}', async () => {
  const authorId = '60850257e867043fc035f03e'
  const response = await axios.get(`${api}/authors/${authorId}`)

  expect(response.status).toEqual(400)
  expect(response.data._id).toEqual(authorId)
  expect(response.data).toHaveProperty('email')
})

test('GET /books/{_id}', async () => {
  const bookId = '60ba4a24b97eaa5ee8f1bcd7'
  const response = await axios.get(`${api}/books/${bookId}`)

  expect(response.status).toEqual(200)
  expect(response.data._id).toEqual(bookId)
  expect(response.data).toHaveProperty('code')
})


test('GET /publishers/{_id}', async () => {
  const publisherId = '60b51d48bd81722678844224'
  const response = await axios.get(`${api}/publishers/${publisherId}`)

  expect(response.status).toEqual(200)
  expect(response.data._id).toEqual(publisherId)
  expect(response.data).toHaveProperty('name')
})

test('POST /authors', async () => {
  const code = randStr(6)
  const name = 'Author tester'
  const gender = 'Male'
  const address = 'HCM'

  const response = await axios.post(`${api}/authors`, { code, name, gender, address })

  expect(response.status).toEqual(201)
  expect(response.data.code).toEqual(code)
  expect(response.data.name).toEqual(name)
  expect(response.data.gender).toEqual(gender)
  expect(response.data.address).toEqual(address)
})

test('POST /categories', async () => {
  const name = 'Category tester'
  const description = 'jest'

  const response = await axios.post(`${api}/categories`, { description, name })

  expect(response.status).toEqual(201)
  expect(response.data.name).toEqual(name)
  expect(response.data.description).toEqual(description)
})

test('POST /publishers', async () => {
  const code = randStr(6)
  const name = 'Publisher tester'
  const address = 'HCM'
  const description = 'jest'

  const response = await axios.post(`${api}/publishers`, { description, name, code, address })

  expect(response.status).toEqual(201)
  expect(response.data.name).toEqual(name)
  expect(response.data.description).toEqual(description)
  expect(response.data.code).toEqual(code)
  expect(response.data.address).toEqual(address)
})
