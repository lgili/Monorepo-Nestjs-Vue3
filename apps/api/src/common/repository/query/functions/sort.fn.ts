/**
 * Build a Prisma-compatible ORDER BY array from `sort` strings.
 *
 * @param sort  Array of `"field:direction"` entries, e.g. `["name:asc","age:desc"]`.
 * @returns     An array you can pass as `orderBy` to `prisma.model.findMany`.
 */
export function buildOrderBy(sort?: string[]): Record<string, 'asc'|'desc'>[] {
    if (!sort) return [];
    return sort.map(entry => {
      const [field, dir] = entry.split(':');
      return { [field]: dir === 'desc' ? 'desc' : 'asc' };
    });
  }
  