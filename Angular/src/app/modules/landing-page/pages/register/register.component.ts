import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpInfo} from '../../../../core/authentication/signup-info';
import {AuthService} from '../../../../core/authentication/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;
  public isTypeOwner: boolean;
  public extendedMode: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      passwordValidate: new FormControl(null, Validators.required),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      phoneNumber: new FormControl(null),
    });
    this.loading = false;
    this.isTypeOwner = false;
    this.extendedMode = false;
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.form.valid && this.form.value.password === this.form.value.passwordValidate) {
      const data = new SignUpInfo(
        this.form.value.username,
        this.form.value.email,
        this.form.value.password,
        '',
        '',
        this.isTypeOwner ? '1' : '0',
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.phoneNumber
      );
      this.loading = true;
      this.authService.signUp(data).subscribe(res => {
          console.log(res);
          this.loading = false;
          this.router.navigate(['/landing-page/register-success']);
        },
        error => {
          console.log(error);
        });
    }
  }

  public changePage(): void {
    if (this.form.valid && this.form.value.password === this.form.value.passwordValidate) {
      this.extendedMode = true;
      this.form.get('firstName').setValidators(Validators.required);
      this.form.get('lastName').setValidators(Validators.required);
      this.form.get('phoneNumber').setValidators(Validators.required);
    }
  }

  public changeRegistrationType(): void {
    this.isTypeOwner = !this.isTypeOwner;
    console.log(this.isTypeOwner);
  }

  public navigate(url: string): void {
    this.router.navigate([url]);
  }
}
