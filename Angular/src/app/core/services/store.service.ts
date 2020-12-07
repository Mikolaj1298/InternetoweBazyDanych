import {Injectable} from '@angular/core';
import {ApartmentModel} from '../../shared/models/Apartment.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _apartmentList: ApartmentModel[];
  public lastRoot: BehaviorSubject<string>;

  constructor() {
    this._apartmentList = [];
    this.lastRoot = new BehaviorSubject<any>('/home/main');
  }

  public getApartmentList(): ApartmentModel[] {
    return this._apartmentList;
  }

  public setApartmentList(value: ApartmentModel[]): void {
    this._apartmentList = value;
  }

  public addApartment(apartment: ApartmentModel): void {
    this._apartmentList.push(apartment);
  }

}
