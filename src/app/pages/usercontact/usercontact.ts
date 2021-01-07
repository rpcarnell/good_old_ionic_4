import { Component,  Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register-service';

@Component({
  selector: 'app-usercontact',
  templateUrl: './usercontact.html',
  styleUrls: ['./usercontact.scss'],
})
export class UserContactPage extends BasePage {
  public form: FormGroup;
  private username: string;
  private countriesList: Array<any>;
  private countryAbbr: string;
  constructor(injector: Injector, private registerService: RegisterService) {
      super(injector);
      const gc = this.registerService.getCurrent();
      this.username = gc.fullname;
      this.form = new FormGroup({
        address: new FormControl('', [Validators.required]),
        address2: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        postcode: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
       });
      this.countryAbbr = gc.country;
      this.form.patchValue({email: gc.email, address: gc.address, address2: gc.address2, city: gc.city, state: gc.state, country: gc.country, postcode: gc.postcode, phone: gc.phone});
  }
  ionViewDidEnter() {
     const $r = this.registerService.countriesList()
     .then( text => { this.countriesList = text; } );
  }
  onDismiss() { this.modalCtrl.dismiss(); }
  enableMenuSwipe() { return true; }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  onSubmit() {
    const formData = this.form.value;

    if (formData.phone == null) { formData.phone = ''; }

    if (formData.postcode == null) { formData.postcode = ''; }

    if (formData.address == null) {
      return this.translate.get('ENTER_ADDRESS').subscribe(str => this.showToast(str)); }

    if (formData.city == null) {
        return this.translate.get('ENTER_CITY').subscribe(str => this.showToast(str)); }

    if (formData.state == null) {
          return this.translate.get('STATE').subscribe(str => this.showToast(str)); }

    if (formData.email == null) {
          return this.translate.get('EMAIL_INVALID').subscribe(str => this.showToast(str)); }

    if (formData.country == null) {
        return this.translate.get('COUNTRY').subscribe(str => this.showToast(str)); }

    if (formData.address.length > 150) {
      return this.translate.get('OVER_LENGTH_ADDRESS').subscribe(str => this.showToast(str)); }

    if (typeof(formData.address2) === 'undefined' || formData.address2 == null || formData.address2 == '') {
        formData.address2 = '';
        this.form.patchValue({address2: 'X'});
    }

    if (formData.address2.length > 150) {
      return this.translate.get('OVER_LENGTH_ADDRESS').subscribe(str => this.showToast(str)); }

    if (formData.city.length > 50) {
      return this.translate.get('OVER_LENGTH_CITY').subscribe(str => this.showToast(str)); }

    if (formData.state.length > 50) {
      return this.translate.get('OVER_LENGTH_CITY').subscribe(str => this.showToast(str)); }

    if (formData.postcode.length > 20) {
      return this.translate.get('OVER_LENGTH_POSTCODE').subscribe(str => this.showToast(str)); }

    if (formData.email.length > 50) {
      return this.translate.get('OVER_LENGTH_EMAIL').subscribe(str => this.showToast(str)); }

    if (! this.validateEmail(formData.email)) {
      return this.translate.get('EMAIL_WRONG_FORMAT').subscribe(str => this.showToast(str)); }

    if (formData.phone.length > 50) {
      return this.translate.get('OVER_LENGTH_PHONE').subscribe(str => this.showToast(str)); }

    if (this.form.invalid) {
      return this.translate.get('INVALID_FORM').subscribe(str => this.showToast(str)); }

    this.registerService.updateContact(formData)
    .then(data => {
        this.registerService.updateUser(data);
        this.onDismiss();
        this.translate.get('SAVED').subscribe(str => this.showToast(str));
    });
  }
}
