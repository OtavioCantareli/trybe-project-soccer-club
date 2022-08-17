export interface Index {
  id: number;
}

export default interface IntUser extends Index {
  username: string;
  password: string;
  role: 'user' | 'admin';
  email: string;
}
