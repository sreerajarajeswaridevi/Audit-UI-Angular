export interface User {
  temple_name?: string;
  temple_code?: string;
  temple_address?: string;
  phone_number?: string;
  displayName?: string;
  username: string;
  password: string;
  photoUrl?: string;
  isAdmin?: boolean;
  role?: string;
  email?: string;
  logo?: string;
  icon?: string;
  misc?: string;
}

export const mockUser = {
  user: {
    temple: 'RR',
    displayName: 'MANAGER',
    username: '',
    password: '',
    photoUrl: 'https://img.icons8.com/bubbles/2x/user-male.png',
    role: 'admin',
    email: 'test@gmail.com',
    misc: ''
  },
};