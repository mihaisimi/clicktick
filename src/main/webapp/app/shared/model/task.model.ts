import { ITaskSheet } from 'app/shared/model/task-sheet.model';
import { TaskStateEnum } from 'app/shared/model/enumerations/task-state-enum.model';

export interface ITask {
  id?: number;
  state?: TaskStateEnum | null;
  name?: string | null;
  description?: string | null;
  externalId?: string | null;
  taskSheet?: ITaskSheet | null;
}

export const defaultValue: Readonly<ITask> = {};
