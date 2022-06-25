import dayjs from 'dayjs';
import { ITask } from 'app/shared/model/task.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { TaskSheetTypeEnum } from 'app/shared/model/enumerations/task-sheet-type-enum.model';

export interface ITaskSheet {
  id?: number;
  brand?: TaskSheetTypeEnum;
  name?: string | null;
  comment?: string | null;
  active?: boolean | null;
  completed?: boolean | null;
  date?: string | null;
  workMinutes?: number | null;
  workPause?: number | null;
  tasks?: ITask[] | null;
  owner?: ICustomer | null;
}

export const defaultValue: Readonly<ITaskSheet> = {
  active: false,
  completed: false,
};
