export class ApartmentBasicInfoModel {
  private _street: string;
  private _houseNumber: string;
  private _houseNumberExt: string;


  constructor(street: string, houseNumber: string, houseNumberExt: string) {
    this._street = street;
    this._houseNumber = houseNumber;
    this._houseNumberExt = houseNumberExt;
  }

}
