import bcrypt from 'bcrypt';

// Example usage

const saltRounds: number = 10;

export const hash = (password: string): string | null => {
  try {
    const hashedPassword: string = bcrypt.hashSync(password, saltRounds);
    console.log('Hashed password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    return null;
  }
}
