import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CustomerUpdatePage {
  pageTitle: ElementFinder = element(by.id('clicktickApp.customer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#customer-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#customer-lastName'));
  emailInput: ElementFinder = element(by.css('input#customer-email'));
  phoneNumberInput: ElementFinder = element(by.css('input#customer-phoneNumber'));
  ewalletAmmountInput: ElementFinder = element(by.css('input#customer-ewalletAmmount'));
  addressInput: ElementFinder = element(by.css('input#customer-address'));
  cityInput: ElementFinder = element(by.css('input#customer-city'));
  countryCodeInput: ElementFinder = element(by.css('input#customer-countryCode'));
  userSelect: ElementFinder = element(by.css('select#customer-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setEwalletAmmountInput(ewalletAmmount) {
    await this.ewalletAmmountInput.sendKeys(ewalletAmmount);
  }

  async getEwalletAmmountInput() {
    return this.ewalletAmmountInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setCountryCodeInput(countryCode) {
    await this.countryCodeInput.sendKeys(countryCode);
  }

  async getCountryCodeInput() {
    return this.countryCodeInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
    await this.setFirstNameInput('firstName');
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('email');
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneNumberInput('phoneNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setEwalletAmmountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setAddressInput('address');
    await waitUntilDisplayed(this.saveButton);
    await this.setCityInput('city');
    await waitUntilDisplayed(this.saveButton);
    await this.setCountryCodeInput('countryCode');
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
