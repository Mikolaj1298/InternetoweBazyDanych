import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthLoginInfo} from './login-info';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {SignUpInfo} from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public backendUrl: string = `http://localhost:8080`;
  public backendUrl = `http://kamienicznik.com.pl/backend`;

  private loginUrl = `${this.backendUrl}/api/auth/signin`;
  private signupUrl = `${this.backendUrl}/api/auth/signup`;
  private updateUrl = '';
  private updateUrlCompany = '';
  public userRoles: string[];

  constructor(private http: HttpClient) {
    this.userRoles = [];
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  update(info: SignUpInfo): Observable<string> {
    return this.http.put<string>(this.updateUrl, info, httpOptions);
  }

  updateCompany(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.updateUrlCompany, info, httpOptions);
  }


}
