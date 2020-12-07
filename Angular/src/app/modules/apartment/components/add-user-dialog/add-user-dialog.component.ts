import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {UserModel} from '../../../../shared/models/User.model';
import {ApiService} from '../../../../core/services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  @Output() completeEmitter = new EventEmitter<any>();
  public userList: UserModel[];
  public usernameSearch: string;
  public isUserChosen: boolean;
  public chosenUser: UserModel;
  public usersLoading: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private api: ApiService, private route: ActivatedRoute) {
    this.userList = [];
    this.chosenUser = new UserModel(null, null,
      null, null, null, null, null, null);
    this.usernameSearch = '';
    this.isUserChosen = false;
    this.usersLoading = false;
  }

  ngOnInit(): void {
  }

  public searchUsers(): void {
    this.usersLoading = true;
    this.api.getAllUsers().subscribe(res => {
      // console.log(res);
      this.userList = [];
      res.forEach(el => this.userList.push(el));
      this.usersLoading = false;
    });
  }

  public chooseUser(user: UserModel): void {
    this.isUserChosen = true;
    this.chosenUser = user;
  }

  public submitUser(): void {
    this.usersLoading = true;
    this.api.addInvitation({
      apartmentId: this.data.apartmentId,
      recipientId: this.chosenUser.id
    }).subscribe(res => {
      this.completeEmitter.emit();
    });
    // this.api.addNewUserToApartment(this.chosenUser.id, this.data.apartmentId).subscribe(res => {
    //   console.log(res);
    //   this.completeEmitter.emit();
    // });
  }
}
