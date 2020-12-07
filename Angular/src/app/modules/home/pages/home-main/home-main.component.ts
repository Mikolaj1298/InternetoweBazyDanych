import {Component, OnInit} from '@angular/core';
import {newArray} from '@angular/compiler/src/util';
import {ApartmentBasicInfoModel} from '../../../../shared/models/ApartmentBasicInfo.model';
import {AddressModel} from '../../../../shared/models/Address.model';
import {ApiService} from '../../../../core/services/api.service';
import {ApartmentModel} from '../../../../shared/models/Apartment.model';
import {StoreService} from '../../../../core/services/store.service';
import {TokenStorageService} from '../../../../core/services/token-storage.service';
import {Router} from '@angular/router';
import {AddUserDialogComponent} from '../../../apartment/components/add-user-dialog/add-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {InvitationDialogComponent} from '../../components/invitation-dialog/invitation-dialog.component';
import {ContractDownloadDialogComponent} from '../../components/contract-download-dialog/contract-download-dialog.component';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss']
})
export class HomeMainComponent implements OnInit {
  public apartmentList: ApartmentModel[];
  public optionList: { label: string; description: string; icon: string; type: string }[];
  public appMode: number;
  public newsList: { label: string, id: number }[];
  public messageList: { label: string }[];
  public apartmentsLoading: boolean;

  constructor(private api: ApiService, private store: StoreService,
              private tokenService: TokenStorageService, private router: Router,
              private dialog: MatDialog) {
    this.apartmentList = [];
    this.optionList = [{
      label: 'Wyślij zaproszenie',
      description: 'Wybierz lokal \n' +
        'i zaproś osobę',
      icon: 'supervisor_account',
      type: 'invitations'
    }, {
      label: 'Wzory umów',
      description: 'Przeglądaj',
      icon: 'assignment',
      type: 'contracts'
    }, {
      label: 'Statystyki',
      description: 'Zobacz szczegóły',
      icon: 'trending_up',
      type: 'invitations'
    }, {
      label: 'Dodaj',
      description: 'Zobacz szczegóły',
      icon: 'add',
      type: 'invitations'
    }];
    this.newsList = [];
    this.messageList = [];
    this.appMode = this.tokenService.getAppMode();
    this.apartmentsLoading = false;
  }

  ngOnInit(): void {
    this.getApartments();
    this.getNotifications();
  }

  public getApartments(): void {
    this.apartmentsLoading = true;
    this.api.getMyApartments().subscribe(res => {
      this.store.setApartmentList([]);
      res.forEach((el: ApartmentModel) => {
        this.store.addApartment(el);
        this.apartmentList.push(el);
      });
      this.apartmentsLoading = false;
      this.navigateTo('/home/main');
    });
  }

  public getNotifications(): void {
    this.api.getInvitations().subscribe(res => {
      this.newsList = [];
      res.forEach((el: { id: number, apartment: ApartmentModel }) => {
        const city = el.apartment.address.city + ' ';
        const street = el.apartment.address.street + ' ';
        const houseNumberExt = '/' + el.apartment.address.houseNumberExt;
        let houseNumber = el.apartment.address.houseNumber;
        if (houseNumberExt) {
          houseNumber += houseNumberExt;
        }
        const newInvitationText = 'Masz nowe zaproszenie do lokalu: ';
        this.newsList.push({
          label: newInvitationText + city + street + houseNumber,
          id: el.id
        });
      });
    });
  }

  public navigateTo(route: string, id?: number): void {
    if (id) {
      this.router.navigate([route + id]);
    } else {
      this.router.navigate([route]);
    }
  }

  public openNotification(item): void {
    const dialogRef = this.dialog.open(InvitationDialogComponent, {
      panelClass: 'transparent-dialog',
      width: '70vh',
      data: {
        label: item.label,
        invitationId: item.id
      }
    });
    dialogRef.componentInstance.completeEmitter.subscribe(() => {
      dialogRef.close();
      this.getApartments();
      this.getNotifications();
    });
  }

  public selectOption(type: string): void {
    switch (type) {
      case 'contracts':
        const dialogRef = this.dialog.open(ContractDownloadDialogComponent, {
          panelClass: 'transparent-dialog',
          width: '70vh',
          data: {
            mode: 3
          }
        });
        dialogRef.componentInstance.completeEmitter.subscribe(() => {
          dialogRef.close();
        });
    }
  }

}
