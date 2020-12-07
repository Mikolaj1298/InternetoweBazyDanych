import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page-extend',
  templateUrl: './landing-page-extend.component.html',
  styleUrls: ['./landing-page-extend.component.scss']
})
export class LandingPageExtendComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  rollUp(): void {
    this.router.navigate(['/landing-page/main']);
  }
}
