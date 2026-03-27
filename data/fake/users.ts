export type FakeUserRole = 'admin' | 'supporter' | 'user';

export type FakeUser = {
  role: FakeUserRole;
  label: string;
  email: string;
  password: string;
  userName: string;
  phone: string;
  walletBalance: number;
  destination: string;
};

export const fakeUsers: FakeUser[] = [
  {
    role: 'admin',
    label: 'Admin demo',
    email: 'admin@kinetic.com',
    password: 'admin123',
    userName: 'Morgan Lee',
    phone: '+1 (555) 0100-0001',
    walletBalance: 500000,
    destination: '/admin/orders',
  },
  {
    role: 'supporter',
    label: 'Support demo',
    email: 'support@kinetic.com',
    password: 'support123',
    userName: 'Support Lead',
    phone: '+1 (555) 0100-0002',
    walletBalance: 25000,
    destination: '/supporter/messages',
  },
  {
    role: 'user',
    label: 'User demo',
    email: 'user@kinetic.com',
    password: 'user123',
    userName: 'John Doe',
    phone: '+1 (555) 0123-4567',
    walletBalance: 142850,
    destination: '/counter-market',
  },
];
