import bcrypt from 'bcrypt';

export const hashBcrypt = async (password: string, saltRounds = 10) => {
  return await bcrypt.hash(password, saltRounds);
};

export const compareBcrypt = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
