import { IUser } from 'app/shared/model/user.model';
import { ITaskSheet } from 'app/shared/model/task-sheet.model';

export interface ICustomer {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  ewalletAmmount?: number | null;
  address?: string | null;
  city?: string | null;
  countryCode?: string | null;
  user?: IUser;
  taskSheets?: ITaskSheet[] | null;
}

export const defaultValue: Readonly<ICustomer> = {};
