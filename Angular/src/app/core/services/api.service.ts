import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddressModel} from '../../shared/models/Address.model';
import {ApartmentModel} from '../../shared/models/Apartment.model';
import {UserModel} from '../../shared/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public backendUrl = `http://localhost:8080`;
  public backendUrl = `http://kamienicznik.com.pl/backend`;

  constructor(private http: HttpClient) {
  }

  public addNewApartment(apartment: ApartmentModel): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/apartment/add`, apartment);
  }

  public addNewAddress(address: AddressModel): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/address/add`, address);
  }

  public addNewUserToApartment(user: number, apartmentId): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/apartment/addUser?id=${apartmentId}`, user);
  }

  public getMyApartments(): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/user/apartments`);
  }

  public getApartment(id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/apartment/users?id=${id}`);
  }

  public getApartmentUsers(id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/apartment/users?id=${id}`);
  }

  public getAllUsers(): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/user/getAll`);
  }

  public addInvitation(data): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/invitation/add`, data);
  }

  public getInvitations(): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/user/getInvitations`);
  }

  public acceptInvitation(id: number, accept: boolean): Observable<any> {
    return this.http.delete(`${this.backendUrl}/api/invitation/resolve?id=${id}&accept=${accept}`);
  }

  public getUserInfo(id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/api/user/getById/${id}`);
  }

  public startConversation(id: UserModel): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/conversation/add`, id);
  }

  public addMessage(conversationId: number, data: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/conversation/addMessage?conversationId=${conversationId}`, data);
  }

}


// {
//   country: 'Polska',
//     city: 'Wroclaw',
//   district: 'Dolnoslaskie',
//   street: 'Godebskiego',
//   houseNumber: '17',
//   houseNumberExt: '1',
// }
