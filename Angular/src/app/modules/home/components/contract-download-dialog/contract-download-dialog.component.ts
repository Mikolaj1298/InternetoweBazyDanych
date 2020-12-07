import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApiService} from '../../../../core/services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contract-download-dialog',
  templateUrl: './contract-download-dialog.component.html',
  styleUrls: ['./contract-download-dialog.component.scss']
})
export class ContractDownloadDialogComponent implements OnInit {
  @Output() completeEmitter = new EventEmitter<any>();
  public invoiceList: { name: string, url: string }[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data, private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.data.mode === 3) {
      this.invoiceList = [
        {name: 'Uwowa długoterminowa', url: 'http://kamienicznik.com.pl/umowa1.pdf'},
        {name: 'Uwowa krótkoterminowa', url: 'http://kamienicznik.com.pl/umowa1.pdf'},
        {name: 'Uwowa bezterminowa', url: 'http://kamienicznik.com.pl/umowa1.pdf'},
      ];
    } else {
      this.invoiceList = [
        {name: 'Uwowa długoterminowa', url: 'http://kamienicznik.com.pl/umowa1.pdf'},
      ];
    }
  }

  chooseInvoice(item: { name: string; url: string }): void {
    window.open(item.url, '_blank');
  }
}
