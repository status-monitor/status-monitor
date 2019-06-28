import { NextFunction, Request, Response } from 'express';
import { APIError } from '@api/models/api-error';

export const errorHandling = (err: APIError, req: Request, res: Response, _1: NextFunction) => {
  // if this is not a classic API error, we throw a 500
  if (!err.statusCode) {
    const error = (err as unknown) as Error;
    console.error(error);
    res.status(500);
    // if (!config.app.isProduction) {
    //   return res.send(error.stack.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    // }
    return res.send('Internal server error');
  }

  res.status(err.statusCode);
  console.info('API Error');
  console.error(err);
  res.send({
    success: false,
    // error: config.app.env !== 'production' ? err.error.message : undefined,
  });
};

process.removeAllListeners('unhandledRejection');
// for async calls without await, we need to catch errors
process.on('unhandledRejection', error => {
  console.error(error);
  //   reportErrorToServers(error as Error);
});
