import { RenamedclassInterface } from 'interfaces/renamedclass';
import { GetQueryInterface } from 'interfaces';

export interface TestInterface {
  id?: string;
  name: string;
  class_id?: string;
  created_at?: any;
  updated_at?: any;

  Renamedclass?: RenamedclassInterface;
  _count?: {};
}

export interface TestGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  class_id?: string;
}
