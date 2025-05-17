import path from 'path';

export const getPath = (dir: string, ...paths: string[]) => {
  return path.join(dir, ...paths);
};
