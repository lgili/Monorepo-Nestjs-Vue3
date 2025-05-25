import { IsOptional, IsArray, IsString } from 'class-validator';

/**
 * DTO for sorting options in queries.
 * 
 * Example:
 *   GET /users?sort=name:asc,createdAt:desc
 */
export class SortDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sort?: string[];
}
