import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TaskSheetUpdatePage from './task-sheet-update.page-object';

const expect = chai.expect;
export class TaskSheetDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('clicktickApp.taskSheet.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-taskSheet'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TaskSheetComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('task-sheet-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('task-sheet');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTaskSheet() {
    await this.createButton.click();
    return new TaskSheetUpdatePage();
  }

  async deleteTaskSheet() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const taskSheetDeleteDialog = new TaskSheetDeleteDialog();
    await waitUntilDisplayed(taskSheetDeleteDialog.deleteModal);
    expect(await taskSheetDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clicktickApp.taskSheet.delete.question/);
    await taskSheetDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(taskSheetDeleteDialog.deleteModal);

    expect(await isVisible(taskSheetDeleteDialog.deleteModal)).to.be.false;
  }
}
