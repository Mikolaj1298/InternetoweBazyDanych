import {MetadataPersonal} from './metadata-personal';
import {MetadataCompany} from './metadata-company';


export class SignUpInfo {
  username: string;
  email: string;
  role: string[];
  password: string;
  type: string;
  // tslint:disable-next-line:variable-name
  tenant_meta: MetadataPersonal;
  // tslint:disable-next-line:variable-name
  owner_meta: MetadataCompany;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  constructor(username: string, email: string, password: string, metaFirstArg: string, metaSecondArg: string, type: string,
              firstName: string, lastName: string, phoneNumber: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.type = type;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    if (this.type === '0') {
      this.role = ['tenant'];
      this.tenant_meta = new MetadataPersonal(metaFirstArg, metaSecondArg);
    }
    if (this.type === '1') {
      this.role = ['owner'];
      this.owner_meta = new MetadataCompany(metaFirstArg, metaSecondArg);
    }
  }
}
