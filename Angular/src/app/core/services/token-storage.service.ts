import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {StoreService} from './store.service';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  private loggedIn: BehaviorSubject<boolean>;
  private appMode: number;

  constructor(private store: StoreService) {
    this.getToken() !== null ? this.loggedIn = new BehaviorSubject<boolean>(true) :
      this.loggedIn = new BehaviorSubject<boolean>(false);
    this.appMode = null;
  }

  public checkLoginSession(): Observable<boolean> {
    return this.loggedIn;
  }

  public signOut(): void {
    window.sessionStorage.clear();
    this.loggedIn.next(false);
    this.store.setApartmentList([]);
    this.checkLoginSession().subscribe();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.loggedIn.next(true);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public removeToken(): void {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  public saveUsername(username: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  // tslint:disable-next-line:ban-types
  public checkRoleMatches(roles: String[]): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < roles.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.roles.length; j++) {
        if (roles[i] === this.roles[j]) {
          return true;
        }
      }
    }
    return false;
  }

  public getAppMode(): number {
    const authoritiesArray = this.getAuthorities();
    if (authoritiesArray[0] === 'ROLE_OWNER') {
      return 0;
    } else {
      return 1;
    }
  }

  public emitLoggedIn(): void {
    this.loggedIn.next(true);
  }
}
