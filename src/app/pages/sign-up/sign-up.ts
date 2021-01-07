
import { Component, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { BasePage } from '../base-page/base-page';
import { User } from '../../services/user-service';
import { RegisterService } from '../../services/register-service';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  styleUrls: ['sign-up.scss']
})
export class SignUpPage extends BasePage {

  public form: FormGroup;

  constructor(injector: Injector,
    private userService: User, private registerService: RegisterService) {
  
    super(injector);
    this.form = new FormGroup({
      name: new FormControl('', [Validators.maxLength(250), Validators.required]),
      //username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('rpcarnell@hotmail.com', [Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      secretquestion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      //secretanswer: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  enableMenuSwipe() {
    return false;
  }

  onDismiss() {
    return this.modalCtrl.dismiss();
  }

  isFieldValid(formControl: AbstractControl) {
    return formControl.valid;
  }

  async onSubmit() {

    if (this.form.invalid) {
      const message = await this.getTrans('INVALID_FORM');
      return this.showToast(message);
    }

    const formData = Object.assign({}, this.form.value);

    if (formData.password !== formData.confirmPassword) {
      const message = await this.getTrans('PASSWORD_DOES_NOT_MATCH');
      return this.showToast(message);
    }

    if (formData.email === '') {
      delete formData.email;
    }

    delete formData.confirmPassword;

    try {

      await this.showLoadingView({ showOverlay: false });
      let user = await this.registerService.create(formData);
      user = JSON.parse(user._body);
      this.showContentView();
      const transParams = { username: user.username };
      this.translate.get('SUCCESSFULLY_REG', transParams).subscribe(str => this.showToast(str));

      await this.onDismiss();

      this.events.publish('user:login', user);

  } catch (err) {
      //alert(JSON.stringify(err));
      this.showContentView();
      err = JSON.parse(err._body);
      if (err.code === 202) {
        this.translate.get('CODE_TAKEN').subscribe(str => this.showToast(str));
      } else if (err.code === 203) {
        this.translate.get('EMAIL_TAKEN').subscribe(str => this.showToast(str));
      } else if (err.code === 125) {
        this.translate.get('EMAIL_INVALID').subscribe(str => this.showToast(str));
      }
      else if (err.code === 126) {
        this.translate.get('PASSWORD_VALIDATION_HELP').subscribe(str => this.showToast(str));
      }
      else {
        if (err.error) this.showToast(err.error);
        else this.translate.get('ERROR_NETWORK').subscribe(str => this.showToast(str));
      }

    }

  }

}
