import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  checked = true;
  color: ThemePalette = 'warn';

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    pswd: new FormControl('', Validators.required),
    rePswd: new FormControl('', Validators.required)
  });

  constructor(
    private location: Location,
    private authService: AuthService,
    private snackBar: MatSnackBar, 
    private router: Router,
    private userService: UserService){}

  onSubmit() {
    if (this.valid_pswd_confirm() && this.checked){
      this.authService.signup(this.signUpForm.get('email')?.value!, this.signUpForm.get('pswd')?.value!).then(cred => {
        console.log(cred.user?.uid);

        const user: User = {
          id: cred.user?.uid as string,
          name: this.signUpForm.get('name')?.value!,
          email: this.signUpForm.get('email')?.value!
        };

        this.userService.create(user).then(_ => {
          this.snackBar.open('Sikeres regisztráció!', '', { duration: 3000 });
        }).catch(error => {
          console.error(error);
          this.snackBar.open(error, '', { duration: 3000 });
        })

        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.error(error);
        this.snackBar.open(error, '', { duration: 3000 });
      });
    }
  }  

  valid_pswd_confirm(): boolean{
    if (this.signUpForm.get('pswd')?.value!.trim() !== this.signUpForm.get('rePswd')?.value!.trim()){
      this.snackBar.open('A két jelszó nem egyezik!', '', { duration: 3000 });
      return false;
    } return true;
  }

  change_check(){
    this.checked = !this.checked;
  }

  goBack() {
    this.location.back();
  }
}
