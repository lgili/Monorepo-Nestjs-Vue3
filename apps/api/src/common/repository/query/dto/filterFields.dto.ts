import { IsOptional, IsObject } from 'class-validator';

/**
 * DTO for filtering fields in queries.
 * 
 * Example:
 *   GET /users?filter[name]=john&filter[active]=true
 */
export class FilterFieldsDto {
  @IsOptional()
  @IsObject()
  filter?: Record<string, any>;
}
