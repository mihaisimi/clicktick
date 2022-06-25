import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TaskSheet from './task-sheet';
import TaskSheetDetail from './task-sheet-detail';
import TaskSheetUpdate from './task-sheet-update';
import TaskSheetDeleteDialog from './task-sheet-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TaskSheetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TaskSheetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TaskSheetDetail} />
      <ErrorBoundaryRoute path={match.url} component={TaskSheet} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TaskSheetDeleteDialog} />
  </>
);

export default Routes;
