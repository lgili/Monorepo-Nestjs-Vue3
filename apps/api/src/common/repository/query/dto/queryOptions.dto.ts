import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';
import { FilterFieldsDto } from './filterFields.dto';
import { SortDto } from './sort.dto';
import { PopulateFieldsDto } from './populateFields.dto';

/**
 * Combined DTO for all supported query options:
 *   - page, limit for pagination
 *   - filter for WHERE clauses
 *   - sort for ORDER BY
 *   - populate for INCLUDE
 */
export class QueryOptionsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  filter?: FilterFieldsDto['filter'];

  @IsOptional()
  sort?: SortDto['sort'];

  @IsOptional()
  populate?: PopulateFieldsDto['populate'];
}
