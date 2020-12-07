import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../../../core/services/api.service';

@Component({
  selector: 'app-first-login-dialog',
  templateUrl: './first-login-dialog.component.html',
  styleUrls: ['./first-login-dialog.component.scss']
})
export class FirstLoginDialogComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
  }

  public navigate(): void {
    this.router.navigate(['/configuration/user-type']);
  }

  public testEndpoint(): void {
  }
}
