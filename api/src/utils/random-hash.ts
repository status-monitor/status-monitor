import * as crypto from 'crypto';

export const generateRandomHash = (length: number = 8) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err: Error, buf: Buffer) => {
      if (err) {
        return reject(err);
      }
      resolve(buf.toString('hex'));
    });
  });
};
