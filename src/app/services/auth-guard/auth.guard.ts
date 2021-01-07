import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user-service';

import { RegisterService } from '../../services/register-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private registerService: RegisterService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    //if (!User.getCurrent()) 
    if (! this.registerService.getCurrent()) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }
}
