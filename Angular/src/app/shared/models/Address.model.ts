export class AddressModel {
  public country: string;
  public district: string;
  public city: string;
  public street: string;
  public houseNumber: string;
  public houseNumberExt: string;


  constructor(country: string, district: string, city: string, street: string, houseNumber: string, houseNumberExt: string) {
    this.country = country;
    this.district = district;
    this.city = city;
    this.street = street;
    this.houseNumber = houseNumber;
    this.houseNumberExt = houseNumberExt;
  }
}
