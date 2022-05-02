import { UserCreateInput } from '~/models/user';

const user: UserCreateInput = {
  name: 'test',
  email: 'test@example.com',
  password: 'hogehoge',
  published: false,
};

const users = [user];

export const mockUser = {
  user,
  users,
};
