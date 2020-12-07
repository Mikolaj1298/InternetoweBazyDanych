import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-successfully',
  templateUrl: './register-successfully.component.html',
  styleUrls: ['./register-successfully.component.scss']
})
export class RegisterSuccessfullyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigate(): void {
    this.router.navigate(['/landing-page/login']);
  }
}
