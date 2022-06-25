import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TaskUpdatePage {
  pageTitle: ElementFinder = element(by.id('clicktickApp.task.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  stateSelect: ElementFinder = element(by.css('select#task-state'));
  nameInput: ElementFinder = element(by.css('input#task-name'));
  descriptionInput: ElementFinder = element(by.css('input#task-description'));
  externalIdInput: ElementFinder = element(by.css('input#task-externalId'));
  taskSheetSelect: ElementFinder = element(by.css('select#task-taskSheet'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStateSelect(state) {
    await this.stateSelect.sendKeys(state);
  }

  async getStateSelect() {
    return this.stateSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption() {
    await this.stateSelect.all(by.tagName('option')).last().click();
  }
  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setExternalIdInput(externalId) {
    await this.externalIdInput.sendKeys(externalId);
  }

  async getExternalIdInput() {
    return this.externalIdInput.getAttribute('value');
  }

  async taskSheetSelectLastOption() {
    await this.taskSheetSelect.all(by.tagName('option')).last().click();
  }

  async taskSheetSelectOption(option) {
    await this.taskSheetSelect.sendKeys(option);
  }

  getTaskSheetSelect() {
    return this.taskSheetSelect;
  }

  async getTaskSheetSelectedOption() {
    return this.taskSheetSelect.element(by.css('option:checked')).getText();
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
    await this.stateSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setNameInput('name');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setExternalIdInput('externalId');
    await this.taskSheetSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
