import { HTTP_STATUS } from '@ethang/toolbelt/constants/http';
import type { ZodError } from 'zod';

export function okResponse(data: unknown) {
  return Response.json(
    { data },
    {
      headers: { 'Content-Type': 'application/json' },
      status: HTTP_STATUS.OK,
    },
  );
}

export function notFoundResponse(message: string) {
  return Response.json(
    { error: message },
    {
      headers: { 'Content-Type': 'application/json' },
      status: HTTP_STATUS.NOT_FOUND,
    },
  );
}

export function badRequestResponse(error: Error | ZodError) {
  return Response.json(
    { error },
    {
      headers: { 'Content-Type': 'application/json' },
      status: HTTP_STATUS.BAD_REQUEST,
    },
  );
}

export function internalServerErrorResponse(message: string) {
  return Response.json(
    { error: message },
    {
      headers: { 'Content-Type': 'application/json' },
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    },
  );
}
