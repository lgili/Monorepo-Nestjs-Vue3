/**
 * Build a Prisma-compatible `select` object.
 *
 * @param fields  List of top-level fields to include in results.
 * @returns       A `select` map or `undefined` if none.
 */
export function buildSelect(fields?: string[]): Record<string, boolean> | undefined {
    if (!fields || fields.length === 0) return undefined;
    return fields.reduce((sel, f) => ({ ...sel, [f]: true }), {} as any);
  }
  