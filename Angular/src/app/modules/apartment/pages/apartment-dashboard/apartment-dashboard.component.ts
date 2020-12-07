import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../../core/services/api.service';
import {UserModel} from '../../../../shared/models/User.model';
import {MatDialog} from '@angular/material/dialog';
import {AddUserDialogComponent} from '../../components/add-user-dialog/add-user-dialog.component';
import {TokenStorageService} from '../../../../core/services/token-storage.service';
import {StoreService} from '../../../../core/services/store.service';
import {ContractDownloadDialogComponent} from '../../../home/components/contract-download-dialog/contract-download-dialog.component';

@Component({
  selector: 'app-apartment-dashboard',
  templateUrl: './apartment-dashboard.component.html',
  styleUrls: ['./apartment-dashboard.component.scss']
})
export class ApartmentDashboardComponent implements OnInit {
  public optionList: { label: string; description: string; icon: string; type: string }[];
  public newsList: { label: string }[];
  public messageList: { label: string }[];
  public paymentList: { label: string }[];
  public userList: UserModel[];
  public ownersList: UserModel[];
  public chosenUser: UserModel;
  public appMode: number;
  public usersLoading: boolean;

  constructor(private route: ActivatedRoute, private api: ApiService, private dialog: MatDialog,
              private token: TokenStorageService, private router: Router, private store: StoreService) {
    this.userList = [];
    this.newsList = [];
    this.paymentList = [];
    this.messageList = [];
    // this.appMode = 0;
    this.appMode = this.token.getAppMode();
    this.addjustOptionList();
    this.usersLoading = false;
  }

  ngOnInit(): void {
    // this.api.getApartment(this.route.snapshot.params.id).subscribe(res => {
    //
    // });
    this.getAllUsers();
    this.store.lastRoot.next('/apartment/apartment-dashboard/'
      + this.route.snapshot.params.id);
  }

  public addjustOptionList(): void {
    if (this.appMode === 0) {
      this.optionList = [{
        label: 'Statystyki',
        description: 'Zobacz szczegóły',
        icon: 'trending_up',
        type: 'invitations'
      }, {
        label: 'Aktualne umowy',
        description: 'Przeglądaj umowy z lokatorami',
        icon: 'assignment',
        type: 'invitations'
      }, {
        label: 'Wskazania liczników',
        description: 'Zobacz szczegóły',
        icon: 'flash_on',
        type: 'invitations'
      }, {
        label: 'Zarządzanie lokalem',
        description: 'Edytuj informacje o lokalu',
        icon: 'dashboard',
        type: 'invitations'
      }, {
        label: 'Informacje do ogłoszeń',
        description: null,
        icon: 'format_align_left',
        type: 'invitations'
      }];
    } else {
      this.optionList = [{
        label: 'Dokonaj płatności',
        description: 'Zapłać za aktualny miesiąc',
        icon: 'trending_up',
        type: 'invitations'
      }, {
        label: 'Aktualne umowy',
        description: 'Przeglądaj swoje umowy',
        icon: 'assignment',
        type: 'contracts'
      }];
    }

  }

  public getAllUsers(): void {
    this.usersLoading = true;
    this.api.getApartmentUsers(this.route.snapshot.params.id).subscribe(res => {
      this.userList = [];
      this.ownersList = [];
      res.forEach(el => {
        if (el.type === 0) {
          this.userList.push(
            new UserModel(
              el.id,
              el.email,
              el.status,
              el.type,
              el.username,
              el.firstName,
              el.lastName,
              el.phoneNumber
            ));
        } else {
          this.ownersList.push(
            new UserModel(
              el.id,
              el.email,
              el.status,
              el.type,
              el.username,
              el.firstName,
              el.lastName,
              el.phoneNumber
            ));
        }
      });
      this.usersLoading = false;
    });
  }

  public addNewUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      panelClass: 'transparent-dialog',
      width: '70vh',
      data: {
        apartmentId: this.route.snapshot.params.id
      }
    });
    dialogRef.componentInstance.completeEmitter.subscribe(() => {
      this.getAllUsers();
      dialogRef.close();
    });
  }

  public navigateTo(url: string, id?: number): void {
    this.router.navigateByUrl(url + id);
  }

  public selectOption(type: string): void {
    switch (type) {
      case 'contracts':
        const dialogRef = this.dialog.open(ContractDownloadDialogComponent, {
          panelClass: 'transparent-dialog',
          width: '70vh',
          data: {
            mode: 1
          }
        });
        dialogRef.componentInstance.completeEmitter.subscribe(() => {
          dialogRef.close();
        });
    }
  }
}
