const puppeteer = require('puppeteer');

const user = {
  firstname: 'Floyd',
  lastname: 'Warshall',
  username: 'floydwarshall',
  email: 'floyd@warshall.com',
  password: 'allpairsshortestpath'
};

const circle = {
  name: 'Shortest path enthusiasts',
  description: 'For all those who appreciate shortest paths',
};

const base = 'http://localhost:8080';

let browser;
let page;

beforeAll(async() => {
  browser = await puppeteer.launch();
  // create a new user to provide authentication to tests within this suite
  page = await browser.newPage();
  await page.goto(`${base}/signup`);
  await page.type('#firstName', user.username);
  await page.type('#lastName', user.lastname);
  await page.type('#email', user.email);
  await page.type('#username', user.username);
  await page.type('#password', user.password);
  await page.click('#submitButton');
  await page.waitForSelector('#userTitle');
  await page.close();
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

describe('Circles', () => {

  it('should allow user to create a new circle', async () => {
    await page.goto(`${base}/circles`);
    await page.waitForSelector('#createCircleButton');
    await page.click('#createCircleButton');
    await page.type('#circleNameInput', circle.name);
    await page.type('#circleDescriptionInput', circle.description);
    await page.click('#nextButton');
    await page.click('#nextButton');
    await page.click('#nextButton');
    await page.click('#saveButton');
    await page.waitForSelector('#circlePreview');
    const circles = await page.$$('#circlePreview');
    expect(circles.length).toBe(1);
  },
  10000);

});