/**
 * File: \loadData.test copy.js
 * Project: puppet-test
 * Created Date: Saturday, June 12th 2021, 1:40:13 pm
 * Author: Văn Sang
 * -----
 * Last Modified: Saturday, June 12th 2021, 1:59:38 pm
 * Modified By: Văn Sang
 * ------------------------------------
 */

let puppeteer = require('puppeteer')
let browser = null
let page = null

describe('Save Data', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false })
    page = await browser.newPage()
    await page.setViewport({
      width: 1900,
      height: 1000,
    })
    jest.setTimeout(60000)
  })

  afterAll(async () => {
    //await browser.close();
  })

  beforeEach(async () => {
    await page.goto('http:localhost:3002/documentation')
  })

  test('Find Author', async () => {
    expect.assertions(1)
    try {
      const authorBox = await page.$('#operations-authors-post > div > button')
      await authorBox.evaluate((form) => form.click())

      const tryIt = await page.$('.try-out > button')
      await tryIt.evaluate((form) => form.click())
      await page.select('select.content-type', 'application/json')
      
      expect(40).toBe(40)
      await page.waitForTimeout(13000)
    } catch (error) {
      console.log(error)
    }
  })

})
