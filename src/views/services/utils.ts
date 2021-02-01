export function generateUrl(url: string, queries: Record<string, any>): string {
  const queryPaths = Object.entries(queries).map(([key, value]) => `${key}=${encodeURI(value)}`);

  return `${url}?${queryPaths.join('&')}`;
}

export function getQueriesForGetMany(
  limit?: number,
  offset?: number,
  keyword?: string
): LimitQuery & OffsetQuery & KeywordQuery {
  const queries: LimitQuery & OffsetQuery & KeywordQuery = {};
  if (limit) {
    queries.limit = limit;
  }

  if (offset) {
    queries.offset = offset;
  }

  if (keyword) {
    queries.keyword = keyword;
  }

  return queries;
}
