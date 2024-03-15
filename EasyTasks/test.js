const { Builder, By, Key, until } = require('selenium-webdriver');

describe('To-Do List Test', function() {
    let driver;
    let expect;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        // Dynamisches Importieren von Chai
        const chai = await import('chai');
        expect = chai.expect;
    });

    it('should add a new to-do item', async function() {
        await driver.get('file:///Pfad/zur/index.html');

        const todoInput = await driver.wait(until.elementLocated(By.css('.todo-input')), 1000);
        const todoButton = await driver.findElement(By.css('.todo-button'));

        await todoInput.sendKeys('Sample To-Do Item', Key.RETURN);
        await driver.sleep(1000); // Warten, um sicherzustellen, dass das Element hinzugefügt wurde

        const todoList = await driver.findElement(By.css('.todo-list'));
        const todoItems = await todoList.findElements(By.tagName('li'));

        expect(todoItems.length).to.equal(1);
        expect(await todoItems[0].getText()).to.equal('Sample To-Do Item');
    });

    after(async function() {
        await driver.quit();
    });
});
