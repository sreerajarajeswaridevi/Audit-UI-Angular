export interface User {
  uid: string;
  displayName: string;
  username: string;
  password: string;
  photoUrl: string;
  isAdmin?: boolean;
  role?: string;
}

export const mockUser = {
  user: {
    uid: 'username',
    displayName: 'MANAGER',
    username: '',
    password: '',
    photoUrl: 'https://img.icons8.com/bubbles/2x/user-male.png',
    // isAdmin: true,
    role: 'admin'
  },
};