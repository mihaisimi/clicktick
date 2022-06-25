import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TaskSheetUpdatePage {
  pageTitle: ElementFinder = element(by.id('clicktickApp.taskSheet.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  brandSelect: ElementFinder = element(by.css('select#task-sheet-brand'));
  nameInput: ElementFinder = element(by.css('input#task-sheet-name'));
  commentInput: ElementFinder = element(by.css('input#task-sheet-comment'));
  activeInput: ElementFinder = element(by.css('input#task-sheet-active'));
  completedInput: ElementFinder = element(by.css('input#task-sheet-completed'));
  dateInput: ElementFinder = element(by.css('input#task-sheet-date'));
  workMinutesInput: ElementFinder = element(by.css('input#task-sheet-workMinutes'));
  workPauseInput: ElementFinder = element(by.css('input#task-sheet-workPause'));
  ownerSelect: ElementFinder = element(by.css('select#task-sheet-owner'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBrandSelect(brand) {
    await this.brandSelect.sendKeys(brand);
  }

  async getBrandSelect() {
    return this.brandSelect.element(by.css('option:checked')).getText();
  }

  async brandSelectLastOption() {
    await this.brandSelect.all(by.tagName('option')).last().click();
  }
  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return this.commentInput.getAttribute('value');
  }

  getActiveInput() {
    return this.activeInput;
  }
  getCompletedInput() {
    return this.completedInput;
  }
  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setWorkMinutesInput(workMinutes) {
    await this.workMinutesInput.sendKeys(workMinutes);
  }

  async getWorkMinutesInput() {
    return this.workMinutesInput.getAttribute('value');
  }

  async setWorkPauseInput(workPause) {
    await this.workPauseInput.sendKeys(workPause);
  }

  async getWorkPauseInput() {
    return this.workPauseInput.getAttribute('value');
  }

  async ownerSelectLastOption() {
    await this.ownerSelect.all(by.tagName('option')).last().click();
  }

  async ownerSelectOption(option) {
    await this.ownerSelect.sendKeys(option);
  }

  getOwnerSelect() {
    return this.ownerSelect;
  }

  async getOwnerSelectedOption() {
    return this.ownerSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.brandSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setNameInput('name');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommentInput('comment');
    await waitUntilDisplayed(this.saveButton);
    const selectedActive = await this.getActiveInput().isSelected();
    if (selectedActive) {
      await this.getActiveInput().click();
    } else {
      await this.getActiveInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedCompleted = await this.getCompletedInput().isSelected();
    if (selectedCompleted) {
      await this.getCompletedInput().click();
    } else {
      await this.getCompletedInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await waitUntilDisplayed(this.saveButton);
    await this.setWorkMinutesInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setWorkPauseInput('5');
    await this.ownerSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
