/**
 * Build `skip` and `take` for pagination.
 *
 * @param page   1-based page number (default: 1).
 * @param limit  Items per page (default: 10).
 * @returns      `{ skip, take }` for Prisma.
 */
export function buildPagination(
    page = 1,
    limit = 10
  ): { skip: number; take: number } {
    const take = Math.max(limit, 1);
    const skip = (Math.max(page, 1) - 1) * take;
    return { skip, take };
  }
  