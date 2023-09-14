import { FilterQuery, QueryOptions } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace PaginationConstant {
  export const MIN_PAGE_SIZE = 1;
  export const MAX_PAGE_SIZE = 100;
  export const DEFAULT_PAGE_SIZE = 2;
}

export interface Pagination<T> {
  // The current page number
  page: number;

  // The maximum number of items in each page
  pageSize: number;

  // The items as data list
  data: T[];

  // The current length of the data list
  size: number;

  // The total count of the data list
  totalCount?: number;
}

export function buildPaginationResponse(
  data: any[],
  queryOption: QueryOptions,
  totalCount?: number,
): Pagination<any> {
  return {
    page: Math.floor(queryOption.skip! / queryOption.limit!),
    pageSize: queryOption.limit,
    size: data.length,
    data,
    totalCount,
  } as Pagination<any>;
}

export function getPageSize(pageSize?: number): number {
  if (!pageSize) {
    return PaginationConstant.DEFAULT_PAGE_SIZE;
  }
  pageSize = Math.max(pageSize, PaginationConstant.MIN_PAGE_SIZE);
  pageSize = Math.min(pageSize, PaginationConstant.MAX_PAGE_SIZE);
  return pageSize;
}

export function buildPaginationQuery(
  filter?: FilterQuery<any>,
  queryOptions?: QueryOptions,
): { filter: FilterQuery<any>; queryOptions: QueryOptions } {
  if (!filter) {
    filter = {};
  }
  if (!queryOptions) {
    queryOptions = {};
    queryOptions.skip = 0;
  }
  queryOptions.limit = getPageSize(queryOptions.limit);
  return { filter, queryOptions };
}
