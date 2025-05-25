/**
 * Generic DTO for paginated responses.
 * 
 * @template T  The type of each item in `data`.
 */
export class QueryResponseDto<T> {
    /** The list of returned records */
    data: T[];
  
    /** Pagination metadata */
    meta: {
      total: number;
      page: number;
      limit: number;
      lastPage: number;
    };
  }
  