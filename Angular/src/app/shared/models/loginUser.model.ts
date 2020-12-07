
export class loginUserModel {
  private _name: string;
  private _password: string;

  constructor(name: string, password: string) {
    this._name = name;
    this._password = password;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
