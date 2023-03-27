const { test, expect } = require("@playwright/test");

test("First try", async ({ browser, page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  await page.locator("#hondacheck").click();
  await page.waitForTimeout(5000);
  await page.locator('//*[text()="Open Window"]').click();

  await page.waitForTimeout(5000);

  await page.locator("input[placeholder='Enter Your Name']").type("Olena");
  await page.waitForTimeout(2000);

  await page.selectOption("#carselect", "honda");
  await page.waitForTimeout(2000);
});
