import { IRole } from 'src/utils/interfaces/auth/role.interface';

export interface Payload {
  sub: string;
  name: string;
  email: string;
  user_id_type: number;
  id_number: number;
  role?: IRole[];
  permission?: IPermissions[];
}
