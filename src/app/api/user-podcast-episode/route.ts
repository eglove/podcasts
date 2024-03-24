import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import { isNil } from '@ethang/toolbelt/is/nil';

import { updateUserPodcastEpisodeSchema } from '../../../schema/update-user-podcast-episode';
import {
  badRequestResponse,
  notFoundResponse,
  okResponse,
} from '../../../util/api-util';
import prisma from '../../../util/prisma';
import { TEST_USER } from '../../../util/testing';

export async function PUT(request: Request) {
  const body = await parseFetchJson(request, updateUserPodcastEpisodeSchema);

  if (!body.isSuccess) {
    return badRequestResponse(body.error);
  }

  const user = await prisma.user.findUnique({
    select: { id: true },
    where: { email: TEST_USER.email },
  });

  if (isNil(user)) {
    return notFoundResponse('User not found');
  }

  const updated = await prisma.userPodcastEpisode.update({
    data: { seen: body.data.seen },
    select: { id: true },
    where: {
      id: body.data.id,
    },
  });

  return okResponse(updated);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (isNil(id)) {
    return notFoundResponse('Not found');
  }

  const result = await prisma.userPodcastEpisode.delete({
    select: { id: true },
    where: { id },
  });

  return okResponse(result);
}
