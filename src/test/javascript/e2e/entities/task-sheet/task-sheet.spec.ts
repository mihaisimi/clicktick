import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TaskSheetComponentsPage from './task-sheet.page-object';
import TaskSheetUpdatePage from './task-sheet-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('TaskSheet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taskSheetComponentsPage: TaskSheetComponentsPage;
  let taskSheetUpdatePage: TaskSheetUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    taskSheetComponentsPage = new TaskSheetComponentsPage();
    taskSheetComponentsPage = await taskSheetComponentsPage.goToPage(navBarPage);
  });

  it('should load TaskSheets', async () => {
    expect(await taskSheetComponentsPage.title.getText()).to.match(/Task Sheets/);
    expect(await taskSheetComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TaskSheets', async () => {
    const beforeRecordsCount = (await isVisible(taskSheetComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(taskSheetComponentsPage.table);
    taskSheetUpdatePage = await taskSheetComponentsPage.goToCreateTaskSheet();
    await taskSheetUpdatePage.enterData();
    expect(await isVisible(taskSheetUpdatePage.saveButton)).to.be.false;

    expect(await taskSheetComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(taskSheetComponentsPage.table);
    await waitUntilCount(taskSheetComponentsPage.records, beforeRecordsCount + 1);
    expect(await taskSheetComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await taskSheetComponentsPage.deleteTaskSheet();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(taskSheetComponentsPage.records, beforeRecordsCount);
      expect(await taskSheetComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(taskSheetComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
