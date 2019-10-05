const puppeteer = require('puppeteer');

const user = {
  firstname: 'Alan',
  lastname: 'Turing',
  username: 'alanturing',
  email: 'alan@turing.com',
  password: 'machine'
};

const artifact = {
  title: 'Grandmas Teeth',
  date: '1982',
  origin: 'Grandma',
  tags: 'Teeth, Grandma, Valuable',
  summary: 'Grandma\'s pearly whites',
  text: 'Grandma had her great teeth preserved and wants to give them away to her grandkids'
};

const base = 'http://localhost:8080';

let browser;
let page;

beforeAll(async() => {
  browser = await puppeteer.launch();
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

describe('Artifacts', () => {

  it('should allow user to upload a new artifact', async () => {
    await page.goto(base);
    await page.waitForSelector('#addArtifactButton');
    await page.click('#addArtifactButton');
    await page.type('#titleTextbox', artifact.title);
    await page.type('#dateTextbox', artifact.date);
    await page.type('#originTextbox', artifact.origin);
    await page.type('#tagsTextbox', artifact.tags);
    await page.type('#summaryTextbox', artifact.summary);
    await page.type('#textTextbox', artifact.text);
    await page.click('#saveButton');
    await page.waitForSelector('#artifactTitleText');
    const title = await page.$eval('#artifactTitleText', element => element.innerText);
    expect(title).toBe(artifact.title);
  },
  5000);

  it('should add the new artifact to the artifact grid', async () => {
    await page.goto(base);
    await page.waitForSelector('#gridArtifactTitle');
    const gridArtifactTitles = await page.$$('#gridArtifactTitle');
    expect(gridArtifactTitles.length).toBe(1);
  },
  5000);

});