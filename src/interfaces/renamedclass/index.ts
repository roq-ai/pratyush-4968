import { AttendanceInterface } from 'interfaces/attendance';
import { TestInterface } from 'interfaces/test';
import { VideoInterface } from 'interfaces/video';
import { SchoolInterface } from 'interfaces/school';
import { GetQueryInterface } from 'interfaces';

export interface RenamedclassInterface {
  id?: string;
  name: string;
  qr_code: string;
  wifi_name: string;
  school_id?: string;
  created_at?: any;
  updated_at?: any;
  attendance?: AttendanceInterface[];
  test?: TestInterface[];
  video?: VideoInterface[];
  school?: SchoolInterface;
  _count?: {
    attendance?: number;
    test?: number;
    video?: number;
  };
}

export interface RenamedclassGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  qr_code?: string;
  wifi_name?: string;
  school_id?: string;
}
