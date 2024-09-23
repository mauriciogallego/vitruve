import { IPaginatedResult } from '../../interfaces/types';

export class PaginatedResult<T> implements IPaginatedResult<T> {
  results: T[];
  pagination: {
    total: number;
    size: number;
    skip: number;
    take: number;
    hasMore?: boolean;
  };
}
