export class UserModel {
  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }

  id: number;
  name: string;
  email: string;
  password: string;
}
