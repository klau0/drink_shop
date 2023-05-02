import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private location: Location, private authService: AuthService){}

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    pswd: new FormControl(''),
    rePswd: new FormControl('')
  });

  onSubmit() {
    this.authService.signup(this.signUpForm.get('email')?.value!, this.signUpForm.get('pswd')?.value!).then(cred => {
      console.log(cred);
    }).catch(error => {
      console.error(error);
    });
  }

  goBack() {
    this.location.back();
  }
}
