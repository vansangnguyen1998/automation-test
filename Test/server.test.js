/**
 * File: \server.test.js
 * Project: puppet-test
 * Created Date: Saturday, June 12th 2021, 4:52:36 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Saturday, June 12th 2021, 9:28:34 pm
 * Modified By: Vĩnh Phát

 * ------------------------------------
 */

const { randStr } = require('./util')
const axios = require('axios').default

const api = 'http://localhost:3002/api'

/* Author */
test('GET /authors', async () => {
  const page = 1
  const limit = 10
  
  const response = await axios.get(`${api}/authors`, { params: { page, limit }})

  expect(response.status).toEqual(200)
  
  expect(response.data.page).toEqual(page)
  expect(response.data.limit).toEqual(limit)
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

/* Book */
test('GET /books', async () => {
  const page = 2
  const limit = 10
  
  const response = await axios.get(`${api}/books`, { params: { page, limit }})

  expect(response.status).toEqual(200)
  
  expect(response.data.page).toEqual(page)
  expect(response.data.limit).toEqual(limit)
})

test('GET /categories', async () => {
  const page = 2
  const limit = 10
  
  const response = await axios.get(`${api}/books`, { params: { page, limit }})


  expect(response.status).toEqual(200)
  
  expect(response.data.page).toEqual(page)
  expect(response.data.limit).toEqual(limit)
})

test('POST /categories', async () => {
  const name = 'Category tester'
  const description = 'jest'

  const response = await axios.post(`${api}/categories`, { description, name })

  expect(response.status).toEqual(201)
  expect(response.data.name).toEqual(name)
  expect(response.data.description).toEqual(description)
})

/* Publisher */
test('GET /publishers', async () => {
  const page = 2
  const limit = 10
  
  const response = await axios.get(`${api}/publishers`, { params: { page, limit }})

  expect(response.status).toEqual(200)
  
  expect(response.data.page).toEqual(page)
  expect(response.data.limit).toEqual(limit)
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

/* User */
test('GET /users', async () => {
  const page = 2
  const limit = 10
  
  const response = await axios.get(`${api}/users`, { params: { page, limit }})

  expect(response.status).toEqual(200)
  
  expect(response.data.page).toEqual(page)
  expect(response.data.limit).toEqual(limit)
})

test('POST /users', async () => {
  const code = randStr(6)
  const name = 'User tester'
  const gender = 'Male'
  const address = 'HCM'
  const username = randStr(12)
  const password = randStr(20)

  const response = await axios.post(
    `${api}/users`,
   { code, name, gender, address, username, password }
  )

  expect(response.status).toEqual(201)
  expect(response.data.name).toEqual(name)
  expect(response.data.code).toEqual(code)
  expect(response.data.gender).toEqual(gender)
  expect(response.data.address).toEqual(address)
  expect(response.data.username).toEqual(username)
})

/* Config */
test('GET /configs', async () => {
  const page = 1
  const limit = 10
  
  const response = await axios.get(`${api}/configs`, { params: { page, limit }})

  expect(response.status).toEqual(200)
  
  expect(response.data.page).toEqual(page)
  expect(response.data.limit).toEqual(limit)
})

/* Reader */
test('GET /readers', async () => {
  const page = 2
  const limit = 10
  
  const response = await axios.get(`${api}/readers`, { params: { page, limit }})

  expect(response.status).toEqual(200)
  
  expect(response.data.page).toEqual(page)
  expect(response.data.limit).toEqual(limit)
})
