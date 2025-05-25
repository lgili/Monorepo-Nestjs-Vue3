import { IsOptional, IsArray, IsString } from 'class-validator';

/**
 * DTO for eager-loading related models.
 * 
 * Example:
 *   GET /users?populate=posts,profile
 */
export class PopulateFieldsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  populate?: string[];
}
