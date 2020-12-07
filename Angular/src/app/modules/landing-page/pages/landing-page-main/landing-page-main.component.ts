import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page-main.component.html',
  styleUrls: ['./landing-page-main.component.scss']
})
export class LandingPageMainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public rollDown(): void {
    this.router.navigate(['/landing-page/extend']);
  }
}
