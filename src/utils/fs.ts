import fs from 'fs';

export const readFile = (path: string, encoding: BufferEncoding = 'utf8') => {
  return fs.readFileSync(path, encoding);
};

export const writeFile = (path: string, data: string, encoding: BufferEncoding = 'utf8') => {
  fs.writeFileSync(path, data, encoding);
};

export const deleteFile = (path: string) => {
  fs.unlinkSync(path);
};

export const exists = (path: string) => {
  return fs.existsSync(path);
};
