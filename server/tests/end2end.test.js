const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async() => {
  browser = await puppeteer.launch({ headless: false });
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

describe('end to end', () => {

  it('user should be able to sign up successfully', async () => {
    await page.goto('http://localhost:3000/signup');
    await page.type('#firstName', 'Linus');
    await page.type('#lastName', 'Torvalds');
    await page.type('#email', 'linus@torvalds.com');
    await page.type('#username', 'linustorvalds');
    await page.type('#password', 'linux');
    await page.click('#submitButton');
    await page.waitForNavigation();
    const userTitle = await page.$eval('#userTitle', element => element.innerText);
    expect(userTitle).toBe('Linus Torvalds');
  },
  5000);

  it('user should be able to sign out successfully', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#profileButton');
    await page.click('#logoutButton');
    await page.goto('http://localhost:3000/');
    const landingTitle = await page.$eval('#landingTitle', element => element.innerText);
    expect(landingTitle).toBe('Fun With Friends');
  },
  5000);

  it('user should be able to login successfully', async () => {
    await page.goto('http://localhost:3000/login');
    await page.type('#username', 'linustorvalds');
    await page.type('#password', 'linux');
    await page.click('#loginButton');
    await page.waitForNavigation();
    const userTitle = await page.$eval('#userTitle', element => element.innerText);
    expect(userTitle).toBe('Linus Torvalds');
  },
  5000);

});