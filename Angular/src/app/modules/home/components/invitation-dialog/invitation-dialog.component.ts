import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApiService} from '../../../../core/services/api.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss']
})
export class InvitationDialogComponent implements OnInit {
  @Output() completeEmitter = new EventEmitter<any>();
  public label: string;
  public invitationId: number;
  acceptLoading: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private api: ApiService) {
    this.label = data.label;
    this.invitationId = data.invitationId;
    this.acceptLoading = false;
  }

  ngOnInit(): void {
  }

  public acceptInvitation(accept: boolean): void {
    this.acceptLoading = true;
    this.api.acceptInvitation(this.invitationId, accept).subscribe(res => {
      this.acceptLoading = false;
      this.completeEmitter.emit();
    });
  }


}
