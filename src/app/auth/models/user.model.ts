export interface User {
  temple_name?: string;
  temple_code?: string;
  displayName?: string;
  username: string;
  password: string;
  photoUrl?: string;
  isAdmin?: boolean;
  role?: string;
  email?: string;
}

export const mockUser = {
  user: {
    temple: 'RR',
    displayName: 'MANAGER',
    username: '',
    password: '',
    photoUrl: 'https://img.icons8.com/bubbles/2x/user-male.png',
    role: 'admin',
    email: 'test@gmail.com'
  },
};