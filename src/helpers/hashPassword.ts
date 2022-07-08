import bcrypt from 'bcrypt';

export const hashPassword = (passwordHash:string,salt:string) =>
  bcrypt.hashSync(passwordHash,salt);
  
