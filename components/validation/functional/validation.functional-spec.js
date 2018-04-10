const AxeBuilder = require('axe-webdriverjs');
const { browserStackErrorReporter } = require('../../../test/helpers/browserstack-error-reporter.js');
require('../../../test/helpers/rejection.js');
// Light Theme color contrast is not WCAG 2AA, #fff on #368ac0, focused item on a open dropdown
const axeOptions = {
  rules: [
    {
      id: 'aria-allowed-attr',
      enabled: false
    },
    {
      id: 'aria-required-children',
      enabled: false
    },
    {
      id: 'aria-valid-attr-value',
      enabled: false
    },
    {
      id: 'color-contrast',
      enabled: false
    },
    {
      id: 'region',
      enabled: false
    }
  ]
};
jasmine.getEnv().addReporter(browserStackErrorReporter);
describe('Validation example-index test', () => {
  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.driver.get('http://localhost:4000/components/input/example-index.html');
  });

  // Disable IE11: Async timeout errors
  if (browser.browserName.toLowerCase() !== 'ie') {
    it('Should be accessible on init with no WCAG 2AA violations', async () => {
      const res = await AxeBuilder(browser.driver)
        .configure(axeOptions)
        .exclude('header')
        .analyze();

      expect(res.violations.length).toEqual(0);
    });
  }

  if (browser.browserName.toLowerCase() !== 'safari') {
    it('Should show validation message error "Required" on tab out', async () => {
      const inputEl = await element(by.id('last-name'));
      await browser.driver.wait(protractor.ExpectedConditions.presenceOf(inputEl), 5000);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      // Wait for page with lots of inputs
      await browser.driver.sleep(2000);

      expect(await element(by.css('.message-text')).getText()).toEqual('Required');
    });
  }

  if (browser.browserName.toLowerCase() === 'chrome') {
    it('Should not visual regress', async () => {
      const inputEl = await element(by.id('first-name'));
      await browser.driver.wait(protractor.ExpectedConditions.presenceOf(inputEl), 5000);

      expect(await browser.protractorImageComparison.checkScreen('inputPage')).toEqual(0);
    });
  }
});
