// npm install -g geckodriver
const { spawn } = require('child_process');
const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

let serverProcess;
let driver;

describe('Chat Server', function() {
  this.timeout(5000);

  before(async function() {
    // Start the server
    serverProcess = spawn('node', ['server.js']);
  
    // Add error handling for the spawn command
    serverProcess.on('error', (error) => {
      console.error(`Error starting server: ${error.message}`);
    });
  
    try {
      driver = await new Builder().forBrowser('firefox').build();
    } catch (error) {
      console.error(`Error starting WebDriver: ${error.message}`);
    }
  });

  after(async function() {
    // Check if driver is defined before calling quit
    if (driver) {
      await driver.quit();
    }

    // Stop the server
    serverProcess.kill('SIGTERM');
  });

  it('should open chat and send a Test message', async function() {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.id('input')).sendKeys('Test message', Key.RETURN);
    let message = await driver.wait(until.elementLocated(By.xpath('//li[contains(text(), \'Test message\')]')), 1000);
    let text = await message.getText();
    assert.equal(text, 'Test message');
  });
});