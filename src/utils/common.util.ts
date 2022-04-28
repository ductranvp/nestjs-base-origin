import { v4 as uuid4 } from 'uuid';
import { IFile } from '../interfaces';

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
  return password;
}
