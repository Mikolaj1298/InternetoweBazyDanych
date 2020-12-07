import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';
import {AuthService} from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  /**
   *
   */
  constructor(private router: Router, private token: TokenStorageService,
              private authService: AuthService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.token.getToken() != null) {
      const roles = next.data.permittedRoles as Array<string>;
      if (roles) {
        this.authService.userRoles = roles;
        this.token.checkRoleMatches(roles);
        if (this.token.checkRoleMatches(roles)) { return true; } else {
          this.router.navigate(['/landing-page/main']);
          return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['/landing-page/main']);
      return false;
    }
  }
}
