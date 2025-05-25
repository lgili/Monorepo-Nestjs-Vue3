import { QueryOptionsDto } from './dto/queryOptions.dto';
import { buildWhere }      from './functions/filter.fn';
import { buildOrderBy }    from './functions/sort.fn';
import { buildPagination } from './functions/paginate.fn';
import { buildSelect }     from './functions/select.fn';
import { buildInclude }    from './functions/populate.fn';

/**
 * Takes a validated QueryOptionsDto and returns
 * the full set of args you can spread into
 * `prisma.model.findMany(...)` (or other find calls).
 */
export function queryBuilder(options: QueryOptionsDto): Record<string, any> {
  const where    = buildWhere(options.filter);
  const orderBy  = buildOrderBy(options.sort);
  const { skip, take } = buildPagination(options.page, options.limit);
  const select   = buildSelect((options as any).select);
  const include  = buildInclude(options.populate);

  return {
    where,
    orderBy: orderBy.length ? orderBy : undefined,
    skip,
    take,
    select,
    include,
  };
}
