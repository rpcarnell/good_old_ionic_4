
import { Component, Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { User } from '../../services/user-service';
import { RegisterService } from '../../services/register-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
  styleUrls: ['change-password.scss']
})
export class ChangePasswordPage extends BasePage {

  protected user: User;

  public form: FormGroup;

  constructor(injector: Injector,
    private userService: User, private registerService: RegisterService) {
    super(injector);
    const gc = this.registerService.getCurrent();
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      repassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      secretquestion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      secretanswer: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      fullname: new FormControl('', Validators.required),
    });
    this.form.patchValue({secretquestion: gc.secretquestion, secretanswer: gc.secretanswer, fullname: gc.fullname});
  }

  enableMenuSwipe() {
    return false;
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  async onSubmit() {

    let formData = this.form.value;

    if (formData.password.trim() === '') {
      return this.translate.get('NEED_PASSWORD').subscribe(str => this.showToast(str)); }

    if (formData.password !== formData.repassword) {
        return this.translate.get('MISMATCH_PASSWORD').subscribe(str => this.showToast(str)); }

    if (formData.password.length < 8) {
        return this.translate.get('PASSWORD_VALIDATION_HELP').subscribe(str => this.showToast(str)); }

    if (formData.password.length > 20) {
        return this.translate.get('OVER_LENGTH_PASSWORD').subscribe(str => this.showToast(str)); }

    if (formData.secretanswer.trim() === '' || formData.secretquestion.trim() === '') {
        return this.translate.get('SECRET_QUESTIONANSWE_EMPTY').subscribe(str => this.showToast(str)); }

    if (formData.secretanswer.length > 50) {
        return this.translate.get('OVER_LENGTH_SECRET_ANSWER').subscribe(str => this.showToast(str)); }

    if (formData.secretquestion.length > 50) {
        return this.translate.get('OVER_LENGTH_SECRET_QUESTION').subscribe(str => this.showToast(str)); }

    if (this.form.invalid) {
      return this.translate.get('INVALID_FORM').subscribe(str => this.showToast(str));
    }
    this.registerService.userAccess(formData)
    .then(data => {
        //alert('try this one damnit!');
        this.onDismiss();
        this.translate.get('SAVED').subscribe(str => this.showToast(str));
        //alert(JSON.stringify(data._body)); 
    });
    return;
    /*try {

      await this.showLoadingView({ showOverlay: false });

      this.user = User.getCurrent();

      let loginData = {
        username: this.user.username,
        password: formData.oldPassword
      };
  
      await this.userService.signIn(loginData);
  
      this.user.password = formData.password;
      await this.user.save();

      this.translate.get('SAVED').subscribe(str => this.showToast(str));

      this.showContentView();

    } catch (err) {

      this.showContentView();

      if (err.code === 101) {
        this.translate.get('PASSWORD_INVALID').subscribe(str => this.showToast(str));
      } else {
        this.translate.get('ERROR_NETWORK').subscribe(str => this.showToast(str));
      }

    }*/
  }

}
