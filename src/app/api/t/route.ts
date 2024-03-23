import { HTTP_STATUS } from '@ethang/toolbelt/constants/http';

import { getT } from '../../../util/i18n';

export async function GET(request: Request) {
  const t = await getT(request);
  const search = new URL(request.url).searchParams;
  const items = search.getAll('t');

  const results = {} as Record<keyof typeof items, string>;

  for (const item of items) {
    results[item as keyof typeof items] = t(item);
  }

  return Response.json(results, { status: HTTP_STATUS.OK });
}
