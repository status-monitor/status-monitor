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

export const generateRandomInteger = (maxNumber: number): number => {
  return Math.floor(generateRandomNumber(maxNumber));
};

export const generateRandomNumber = (maxNumber: number): number => {
  return Math.random() * maxNumber;
};

export const waitForRandomTime = (maxSeconds: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, generateRandomNumber(maxSeconds) * 1000);
  });
};
