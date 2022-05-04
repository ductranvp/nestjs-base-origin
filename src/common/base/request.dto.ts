import {
  QueryFields,
  QueryFilter,
  QueryJoin,
  QuerySort,
  SCondition,
} from '../types';

export declare class RequestDto {
  fields: QueryFields;
  paramsFilter: QueryFilter[];
  search: SCondition;
  filter: QueryFilter[];
  or: QueryFilter[];
  join: QueryJoin[];
  sort: QuerySort[];
  limit: number;
  offset: number;
  page: number;
}
