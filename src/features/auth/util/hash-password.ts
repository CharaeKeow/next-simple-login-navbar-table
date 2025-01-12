import bcrypt from "bcrypt";

const SALT_ROUND = 10;

/**
 * A util function to help hash the password using `bcrypt`. The salt round is specified in the `SALT_ROUND` constant in this file
 */
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUND);
};
