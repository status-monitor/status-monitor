import crypto from 'crypto';
import { config } from '@api/config';

const algorithm = 'aes-256-ctr';

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipher(algorithm, config.encryptionKey);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const decrypt = (text: string): string => {
  const decipher = crypto.createDecipher(algorithm, config.encryptionKey);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};
