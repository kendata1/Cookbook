import { chromium } from "playwright-chromium";
import { expect } from "chai";
import { describe } from "mocha";

let browser, page;
const baseUrl = "http://localhost:3000";

describe("E2E tests", async function () {
  before(async () => {
    browser = await chromium.launch();
  });
  after(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
  });
  this.afterEach(async () => {
    await page.close();
  });

  it("loads home page", async function () {
    expect(await page.isVisible("header h1"));
    expect(await page.isVisible("header nav"));
  });
  it("loads register page", async function () {
    await page.click('a[href = "/register"]');

    expect(await page.isVisible("#register-article"));
  });
  it("loads login page", async function () {
    await page.click('a[href = "/login"]');
    expect(await page.isVisible("#login-article"));
  });
});
