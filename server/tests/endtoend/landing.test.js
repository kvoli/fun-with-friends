const puppeteer = require('puppeteer');

const base = 'http://localhost:8080';

let browser;
let page;

beforeAll(async() => {
  browser = await puppeteer.launch();
});

afterAll(async() => {
  await browser.close();
});

beforeEach(async() => {
  page = await browser.newPage();
});

afterEach(async() => {
  await page.close();
});

describe('Landing Page', () => {

  it('should render successfully', async () => {
    await page.goto(base);
    await page.waitForSelector('#landingTitle');
    const landingTitle = await page.$eval('#landingTitle', element => element.innerText);
    expect(landingTitle).toBe('Fun With Friends');
  },
  5000);

});