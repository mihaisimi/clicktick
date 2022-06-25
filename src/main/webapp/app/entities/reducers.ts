import customer from 'app/entities/customer/customer.reducer';
import taskSheet from 'app/entities/task-sheet/task-sheet.reducer';
import task from 'app/entities/task/task.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  customer,
  taskSheet,
  task,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
