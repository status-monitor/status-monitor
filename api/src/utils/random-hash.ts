import * as crypto from 'crypto';

export const generateRandomHash = (length: number = 8): Promise<string> => {
  return new Promise((resolve, reject): void => {
    crypto.randomBytes(length, (err: Error, buf: Buffer): void => {
      if (err) {
        return reject(err);
      }
      resolve(buf.toString('hex'));
    });
  });
};
