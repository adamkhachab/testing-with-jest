const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5);

beforeAll(async () => {
    console.log(fileUnderTest);
    let options = new firefox.Options();
    options.setBinary("C:\\Program Files\\Mozilla Firefox\\firefox.exe");
    driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    await driver.get(fileUnderTest);
});

afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});