// npm install -g geckodriver
// const { spawn } = require('node:child_process');
const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const firefox = require('selenium-webdriver/firefox');

let serverProcess;
let driver;

describe('Chat Server', function() {
  this.timeout(15000); // Set timeout to 10 seconds for all hooks and tests in this describe block
  before(async function() {
    try {
      let options = new firefox.Options("--headless")
      driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options.addArguments('--headless')).build();
      console.log('WebDriver initialized successfully'); // Add this line
    } catch (error) {
      console.error(`Error starting WebDriver: ${error.message}`);
      throw error; // Rethrow the error after logging it
    }
  });

  after(async function() {
    // Check if driver is defined before calling quit
    if (driver) {
      await driver.quit();
    }

    // Stop the server
  });

  it('should open chat and send a Test message', async function() {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.id('input')).sendKeys('Test message', Key.RETURN);
    let message = await driver.wait(until.elementLocated(By.xpath('//li[contains(text(), \'Test message\')]')), 1000);
    let text = await message.getText();
    assert.equal(text, 'Test message');
  });

  it('should have the correct title', async function() {
    await driver.get('http://localhost:3000');
    let title = await driver.getTitle();
    assert.equal(title, 'Socket.IO chat');
  });

  it('should send a sql query and not affect anything', async function() {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.id('input')).sendKeys('DROP TABLE', Key.RETURN);
    let message = await driver.wait(until.elementLocated(By.xpath('//li[contains(text(), \'DROP TABLE\')]')), 1000);
    let text = await message.getText();
    assert.equal(text, 'DROP TABLE');
  });

  it('should send a linux command and not affect anything', async function() {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.id('input')).sendKeys('pwd', Key.RETURN);
    let message = await driver.wait(until.elementLocated(By.xpath('//li[contains(text(), \'pwd\')]')), 1000);
    let text = await message.getText();
    assert.equal(text, 'pwd');
  });

  it('should send a ipconfig command text and not perform it', async function() {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.id('input')).sendKeys('ipconfig', Key.RETURN);
    let message = await driver.wait(until.elementLocated(By.xpath('//li[contains(text(), \'ipconfig\')]')), 1000);
    let text = await message.getText();
    assert.equal(text, 'ipconfig');
  });
});