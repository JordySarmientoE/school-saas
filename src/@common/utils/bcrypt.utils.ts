import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashString(value: string): Promise<string> {
  return await bcrypt.hash(value, SALT_ROUNDS);
}

export async function compareString(
  value: string,
  hashedValue: string,
): Promise<boolean> {
  return await bcrypt.compare(value, hashedValue);
}
