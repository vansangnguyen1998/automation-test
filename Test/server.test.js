/**
 * File: \server.test.js
 * Project: puppet-test
 * Created Date: Saturday, June 12th 2021, 4:52:36 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Saturday, June 12th 2021, 9:22:13 pm
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

test('GET not found', async () => {
  const page = 2
  const limit = 10
  
  const response = await axios.get(`${api}/books-notfound`, { params: { page, limit }})

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
