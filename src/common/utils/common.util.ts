import { v4 as uuid4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { IFile } from '../../modules/media/interfaces/IFile';

export function uuid(): string {
  return uuid4();
}

export function getFileName(file: IFile): string {
  return file.originalname.replace(/\.[^/.]+$/, '');
}

export function getFileExtension(file: IFile): string {
  return file.originalname.split('.').pop();
}

export function generateHash(password) {
  return bcrypt.hashSync(password, 10);
}

export function getNumber(value: string): number {
  try {
    return Number(value);
  } catch {
    throw new Error(value + ' is not a number');
  }
}

export function getBoolean(value: string): boolean {
  try {
    return Boolean(JSON.parse(value));
  } catch {
    throw new Error(value + ' is not a boolean');
  }
}

export function getString(value: string): string {
  return value.replace(/\\n/g, '\n');
}

export function promiseWithTimeout(timeoutMs: number, promise: Promise<any>) {
  return Promise.race([
    promise,
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeoutMs),
    ),
  ]);
}
