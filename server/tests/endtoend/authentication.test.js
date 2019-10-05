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

describe('authentication', () => {

  it('user should be able to sign up successfully', async () => {
    await page.goto(`${base}/signup`);
    await page.type('#firstName', 'Linus');
    await page.type('#lastName', 'Torvalds');
    await page.type('#email', 'linus@torvalds.com');
    await page.type('#username', 'linustorvalds');
    await page.type('#password', 'linux');
    await page.click('#submitButton');
    await page.waitForSelector('#userTitle');
    const userTitle = await page.$eval('#userTitle', element => element.innerText);
    expect(userTitle).toBe('Linus Torvalds');
  },
  5000);

  it('user should be able to logout successfully', async () => {
    await page.goto(base);
    await page.click('#profileButton');
    await page.click('#logoutButton');
    await page.goto(base);
    await page.waitForSelector('#landingTitle');
    const landingTitle = await page.$eval('#landingTitle', element => element.innerText);
    expect(landingTitle).toBe('Fun With Friends');
  },
  5000);

  it('user should be able to login successfully', async () => {
    await page.goto(`${base}/login`);
    await page.type('#username', 'linustorvalds');
    await page.type('#password', 'linux');
    await page.click('#loginButton');
    await page.waitForSelector('#userTitle');
    const userTitle = await page.$eval('#userTitle', element => element.innerText);
    expect(userTitle).toBe('Linus Torvalds');
  },
  5000);

});