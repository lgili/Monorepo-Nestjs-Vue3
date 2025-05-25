/**
 * Build a Prisma-compatible `include` object.
 *
 * @param relations  List of relations (nested models) to include.
 * @returns          An `include` map or `undefined` if none.
 */
export function buildInclude(relations?: string[]): Record<string, boolean> | undefined {
    if (!relations || relations.length === 0) return undefined;
    return relations.reduce((inc, r) => ({ ...inc, [r]: true }), {} as any);
  }
  