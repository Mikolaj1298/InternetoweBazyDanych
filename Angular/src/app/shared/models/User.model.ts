export class UserModel {
  public id: number;
  public email: string;
  public status: string;
  public type: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;


  constructor(id: number, email: string, status: string, type: string, username: string, firstName: string,
              lastName: string, phoneNumber: string) {
    this.id = id;
    this.email = email;
    this.status = status;
    this.type = type;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }
}
