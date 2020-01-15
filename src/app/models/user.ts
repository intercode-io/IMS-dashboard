export class User {
  id: number;
  //todo: configure User model fields
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;

  public constructor(id: number) {
    this.id = id;
  }
}
