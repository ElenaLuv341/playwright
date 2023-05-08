// playwright-dev-page.js
const { expect } = require("@playwright/test");

export class AutomationPracticePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.carsCheckBoxes = page.locator("[name=cars][type=checkbox]");
    this.carCheckBoxHonda = page.locator("#hondacheck");
    this.openWindowButton = page.locator('//*[text()="Open Window"]');
    // this.getStartedLink = page.locator("a", { hasText: "Get started" });
    // this.gettingStartedHeader = page.locator("h1", { hasText: "Installation" });
    // this.pomLink = page
    //   .locator("li", { hasText: "Guides" })
    //   .locator("a", { hasText: "Page Object Model" });
    // this.tocList = page.locator("article div.markdown ul > li > a");
    // this.myString = "Olena";
    // this.myNumber = 3;
  }

  async goto() {
    await this.page.goto("https://www.letskodeit.com/practice");
  }

  async checkingCheckBoxesForCars() {
    for (let checkBox of await this.carsCheckBoxes.all()) {
      await checkBox.check();
    }
    // await this.getStartedLink.first().click();
    // await expect(this.gettingStartedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
}
