import { RenamedclassInterface } from 'interfaces/renamedclass';
import { GetQueryInterface } from 'interfaces';

export interface VideoInterface {
  id?: string;
  name: string;
  url: string;
  class_id?: string;
  created_at?: any;
  updated_at?: any;

  Renamedclass?: RenamedclassInterface;
  _count?: {};
}

export interface VideoGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  url?: string;
  class_id?: string;
}
