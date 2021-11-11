const puppeteer = require('puppeteer');
const APP = `http://localhost:${process.env.PORT || 8080}/`;
jest.setTimeout(100000);

describe('Logs in and presses keys', () => {
  let browser;
  let page;
  beforeAll(async () => {
    try {
    browser = await puppeteer.launch({ 
      headless: false,
      slowMo: 100,
      defaultViewport: {
        width:1920,
        height:1080
      }
    });
    page = await browser.newPage();
    await page.goto(APP);
    await page.screenshot({ path: '/Users/anna/Desktop/example.jpg' });
    } catch (err) {
      console.log(err);
    }
    });

  it('Logs in and presses keys', async () => {
    try {
      await page.waitForSelector('#setUsername');
      await page.focus('#setUsername');
      await page.keyboard.type('yogi1');

      await page.waitForSelector('#setPassword');
      await page.focus('#setPassword');
      await page.keyboard.type('123');

      await page.click('#submitLogin');
      
      await page.waitForSelector('#s');
      await page.focus('#s');
      await page.click('#s');
      await page.waitForTimeout(1500)

      await page.waitForSelector('#i');
      await page.focus('#i');
      await page.click('#i');
      await page.waitForTimeout(1500)

      await page.waitForSelector('#m');
      await page.focus('#m');
      await page.click('#m');
      await page.waitForTimeout(4000)
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(async () => {
    try {
    await browser.close();
    } catch (err) {
      console.log(err)
    }
  })

})
