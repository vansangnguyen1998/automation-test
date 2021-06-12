let puppeteer = require('puppeteer')
let browser = null
let page = null

describe('Test Load Data', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false })
    page = await browser.newPage()
    await page.setViewport({
      width: 1280,
      height: 720,
    })
    jest.setTimeout(60000)
  })

  afterAll(async () => {
    await browser.close();
  })

  beforeEach(async () => {
    await page.goto('http:localhost:3002/documentation')
  })

  test('Find Author', async () => {
    expect.assertions(2)
    try {
      const authorBox = await page.$('#operations-authors-get > div > button')
      await authorBox.evaluate((form) => form.click())

      const tryIt = await page.$('.try-out > button')
      await tryIt.evaluate((form) => form.click())
      const execute = await page.$('.execute-wrapper > button')
      await execute.evaluate((form) => form.click())
      expect(40).toBe(40)
      await page.waitForTimeout(3000)
      const name = await page.$$('td.response-col_status')
      let code = name[1]
      const codeInt = await code.evaluate((name) => name.innerText.split('\n')[0], code)
      await page.waitForTimeout(3000)
      expect(+codeInt).toBe(200)

    } catch (error) {
      console.log(error)
    }
  })

  test('Find Books', async () => {
    expect.assertions(2)
    try {
      const authorBox = await page.$('#operations-books-get > div > button')
      await authorBox.evaluate((form) => form.click())

      const tryIt = await page.$('.try-out > button')
      await tryIt.evaluate((form) => form.click())
      const execute = await page.$('.execute-wrapper > button')
      await execute.evaluate((form) => form.click())
      expect(40).toBe(40)
      await page.waitForTimeout(3000)
      const name = await page.$$('td.response-col_status')
      let code = name[1]
      const codeInt = await code.evaluate((name) => name.innerText.split('\n')[0], code)
      await page.waitForTimeout(3000)
      expect(+codeInt).toBe(200)

    } catch (error) {
      console.log(error)
    }
  })

  test('Find Categories', async () => {
    expect.assertions(2)
    try {
      const authorBox = await page.$('#operations-categories-get > div > button')
      await authorBox.evaluate((form) => form.click())

      const tryIt = await page.$('.try-out > button')
      await tryIt.evaluate((form) => form.click())
      const execute = await page.$('.execute-wrapper > button')
      await execute.evaluate((form) => form.click())
      expect(40).toBe(40)
      await page.waitForTimeout(3000)
      const name = await page.$$('td.response-col_status')
      let code = name[1]
      const codeInt = await code.evaluate((name) => name.innerText.split('\n')[0], code)

      expect(+codeInt).toBe(200)

    } catch (error) {
      console.log(error)
    }
  })

})
