export interface ListQueryParams {
  limit: number;
  offset: number;
}

export type ExtendedQueryParams<T = object> = ListQueryParams & Partial<T>;
