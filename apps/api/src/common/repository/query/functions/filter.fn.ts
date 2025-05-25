/**
 * Build a Prisma-compatible WHERE clause from a plain filter object.
 *
 * @param filter  Key/value pairs to filter by.
 * @returns       A `where` object you can pass to `prisma.model.findMany({ where })`.
 */
export function buildWhere(filter?: Record<string, any>): Record<string, any> {
    if (!filter) return {};
    return Object.entries(filter).reduce((where, [key, value]) => {
      if (value !== undefined && value !== null) {
        where[key] = typeof value === 'string'
          ? { contains: value, mode: 'insensitive' }
          : value;
      }
      return where;
    }, {} as any);
  }
  