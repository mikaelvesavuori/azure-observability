import { Context, HttpRequest } from '@azure/functions';

import { LogUsecase } from '../usecases/Log';

/**
 * @description The controller is where the serverless application "starts".
 */
export async function Log(context: Context, req: HttpRequest): Promise<any> {
  if (!context || !req) throw new Error('Missing context and/or req!');
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  LogUsecase(body);

  return {
    body: 'OK'
  };
}
