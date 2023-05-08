const { test, expect } = require("@playwright/test");
const { AutomationPracticePage } = require("../pages/automation.practice.page");

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

  await page.locator("#mousehover").hover();
  await page.waitForTimeout(2000);
  await expect(page.locator(".mouse-hover-content")).toHaveText("Top Reload");
  console.log(false && true);
});

test("Checking Popup window", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  await page.locator("[placeholder= 'Enter Your Name']").type("Olena P");

  await page.locator("#alertbtn").click();

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("Alert");
    expect(dialog.message()).toContain(
      "Hello Olena P, share this practice page and share your knowledge" // assertion doesn't work
    );
    dialog.accept();
  });
});
test("Checking Iframe", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  const framePage = page.frameLocator("#courses-iframe");
  await framePage.locator("input[id=search]").type("Hello!");
  await expect(framePage.locator("input[id=search]")).toHaveValue("Hello!");

  await page.locator('input[placeholder="Enter Your Name"]').type("Olena");
});

test("Checking condition in test", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  const textField = page.locator("#displayed-tex");
  // if (await textField.isVisible()) {
  //   await textField.type("Do it!");
  // } else {
  //   console.log("It doesnt work!");
  // }
  if (!(await textField.isVisible()) && (await textField.isChecked())) {
    console.log("It doesnt work!");
  }
  await textField.type("Do it!");
  (await textField.isVisible())
    ? await textField.type("Do it!")
    : console.log("Somethings");
  await page.waitForTimeout(5000);
});

test("loop", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  await page.locator("table[id='product']").waitFor({ state: "visible" });

  const courseNames = page.locator(
    "table[id='product'] td[class='course-name']"
  );
  for (let courseName of await courseNames.all()) {
    console.log(await courseName.textContent());
  }
});

test("Looping the prices", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  await page.locator("table[id='product']").waitFor({ state: "visible" });
  const coursePrices = page.locator("table[id='product'] td[class='price']");

  const coursePricesList = [];
  for (let coursePrice of await coursePrices.all()) {
    coursePricesList.push(parseInt(await coursePrice.textContent()));
  }

  console.log(coursePricesList); //[ 35, 30, 25 ]

  let affordableProducts = 0;
  let maxAffordablePrice = 70;
  let totalSumOfAffordableProducts = 0;
  for (let i = 0; i < coursePricesList.length; i++) {
    if (
      totalSumOfAffordableProducts + coursePricesList[i] <=
      maxAffordablePrice
    ) {
      totalSumOfAffordableProducts =
        totalSumOfAffordableProducts + coursePricesList[i];
      if (
        coursePricesList[i] <= maxAffordablePrice &&
        totalSumOfAffordableProducts <= maxAffordablePrice
      ) {
        affordableProducts++;
      }
    }
  }
  console.log(affordableProducts);
  console.log(totalSumOfAffordableProducts);
});

test("CheckBoxes check", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  for (let checkBox of await page.locator("[name=cars][type=checkbox]").all()) {
    await checkBox.check();
  }
});

test("POM example Checkboxes check", async ({ page }) => {
  const automationPracticePage = new AutomationPracticePage(page);
  await automationPracticePage.goto();
  await automationPracticePage.checkingCheckBoxesForCars();
  await page.waitForTimeout(5000);
});

test("POM example first try", async ({ page }) => {
  const automationPracticepage = new AutomationPracticePage(page);
  await automationPracticepage.goto();
  await automationPracticepage.carCheckBoxHonda.click();
  await page.waitForTimeout(5000);

  await automationPracticepage.openWindowButton.click();
  await page.waitForTimeout(5000);

  await page.locator("input[placeholder='Enter Your Name']").type("Olena");
  await page.waitForTimeout(2000);

  await page.selectOption("#carselect", "honda");
  await page.waitForTimeout(2000);

  await page.locator("#mousehover").hover();
  await page.waitForTimeout(2000);
  await expect(page.locator(".mouse-hover-content")).toHaveText("Top Reload");
  console.log(false && true);
});
