import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customer from './customer';
import TaskSheet from './task-sheet';
import Task from './task';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
        <ErrorBoundaryRoute path={`${match.url}task-sheet`} component={TaskSheet} />
        <ErrorBoundaryRoute path={`${match.url}task`} component={Task} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};
