import {AddressModel} from './Address.model';

export class ApartmentModel {
  public id: number;
  public maxLocatorsNumber: number;
  public roomsNumber: number;
  public livingArea: number;
  public address: AddressModel;


  constructor(data?: {id?: any; maxLocatorsNumber: any; roomsNumber: any; livingArea: any; address: AddressModel }) {
    if (data) {
      this.id = data.id;
      this.maxLocatorsNumber = data.maxLocatorsNumber;
      this.roomsNumber = data.roomsNumber;
      this.livingArea = data.livingArea;
      this.address = data.address;
    } else {
      this.id = null;
      this.maxLocatorsNumber = null;
      this.roomsNumber = null;
      this.livingArea = null;
      this.address = null;
    }
  }

}
