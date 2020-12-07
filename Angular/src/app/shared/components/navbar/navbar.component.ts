import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../core/services/token-storage.service';
import {ApiService} from '../../../core/services/api.service';
import {StoreService} from '../../../core/services/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;
  public username: string;
  public lastRoot: string;

  constructor(private router: Router, public token: TokenStorageService,
              private api: ApiService, private store: StoreService) {

    this.token.checkLoginSession().subscribe((answer: boolean) => {
      this.loggedIn = answer;
      this.getUserName();
    });
    this.store.lastRoot.subscribe(root => {
      this.lastRoot = root;
    });
  }

  ngOnInit(): void {
    this.getUserName();
  }

  public getUserName(): void {
    this.username = sessionStorage.getItem('AuthUsername');

  }

  public navigate(path: string): void {
    this.router.navigate([`${path}`]);
  }

  public logOut(): void {
    this.token.signOut();
    this.router.navigate(['/landing-page/main']);
  }

  public testApi(): void {
    console.log('apart');
    // this.api.addInvitation();
    // this.api.testApiApartment().subscribe();
  }
}
