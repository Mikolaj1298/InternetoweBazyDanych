import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/authentication/auth.service';
import {TokenStorageService} from '../../../../core/services/token-storage.service';
import {AuthLoginInfo} from '../../../../core/authentication/login-info';
import {ApiService} from '../../../../core/services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public roles: string[] = [];
  public loading: boolean;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private api: ApiService,
              private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
    this.loading = false;
  }

  ngOnInit(): void {
  }


  public onSubmit(): void {
    if (this.form.valid) {
      const loginInfo = new AuthLoginInfo(
        this.form.value.username,
        this.form.value.password);
      this.loading = true;
      this.authService.attemptAuth(loginInfo).subscribe(res => {
        this.tokenStorage.saveToken(res.accessToken);
        this.tokenStorage.saveUsername(res.username);
        this.tokenStorage.saveAuthorities(res.authorities);
        this.roles = this.tokenStorage.getAuthorities();
        this.tokenStorage.emitLoggedIn();
        this.navigate('/home/main');
      });
    }
  }

  // public testInterceptor(): void {
  //   this.api.testApi().subscribe(res => {
  //     console.log(res);
  //   });
  // }

  public navigate(path: string): void {
    this.router.navigate([path]);
  }
}
