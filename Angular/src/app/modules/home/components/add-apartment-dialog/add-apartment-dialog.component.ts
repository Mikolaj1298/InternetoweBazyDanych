import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddressModel} from '../../../../shared/models/Address.model';
import {ApartmentModel} from '../../../../shared/models/Apartment.model';
import {ApiService} from '../../../../core/services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-apartment-dialog',
  templateUrl: './add-apartment-dialog.component.html',
  styleUrls: ['./add-apartment-dialog.component.scss']
})
export class AddApartmentDialogComponent implements OnInit {
  public form: FormGroup;
  public addressForm: FormGroup;
  public addressMode: boolean;
  public addressAdded: boolean;
  public address: AddressModel;
  apartmentLoading: boolean;

  constructor(private api: ApiService, private router: Router) {
    this.form = new FormGroup({
      maxLocatorsNumber: new FormControl(null),
      roomsNumber: new FormControl(null),
      livingArea: new FormControl(null),
    });
    this.addressForm = new FormGroup({
      country: new FormControl(null),
      district: new FormControl(null),
      city: new FormControl(null),
      street: new FormControl(null, Validators.required),
      houseNumber: new FormControl(null, Validators.required),
      houseNumberExt: new FormControl(null)
    });
    this.addressMode = false;
    this.addressAdded = false;
    this.address = null;
    this.apartmentLoading = false;
  }

  ngOnInit(): void {
  }

  public onApartmentSubmit(): void {
    const data = {
      maxLocatorsNumber: this.form.get('maxLocatorsNumber').value,
      roomsNumber: this.form.get('maxLocatorsNumber').value,
      livingArea: this.form.get('maxLocatorsNumber').value,
      address: this.address,
    };
    // this.api.addNewAddress(this.address).subscribe(res => {
    //   console.log(res);
    // });
    const apartment = new ApartmentModel(data);
    this.apartmentLoading = true;
    this.api.addNewApartment(apartment).subscribe(res => {
      this.router.navigateByUrl('/home/main');
    });
  }

  public activateAddressMode(): void {
    this.addressMode = !this.addressMode;
  }

  public deactivateAddressMode(): void {
    if (this.addressForm.valid) {
      this.addressAdded = true;
      this.address = new AddressModel(
        this.addressForm.get('country').value,
        this.addressForm.get('district').value,
        this.addressForm.get('city').value,
        this.addressForm.get('street').value,
        this.addressForm.get('houseNumber').value,
        this.addressForm.get('houseNumberExt').value
      );
      this.addressMode = !this.addressMode;
    } else {
      this.addressAdded = false;
    }
  }
}
