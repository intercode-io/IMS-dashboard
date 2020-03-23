export class User {
  id: number;
  //todo: configure User model fields
  userName?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;

  public constructor(id: number, userName: string) {
    this.id = id;
    this.userName = userName;
  }
}
