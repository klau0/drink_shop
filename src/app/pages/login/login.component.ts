import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar){}

  async login() {
    this.loading = true;

    console.log(this.email.value);

    this.authService.login(this.email.value!, this.password.value!).then(cred => {
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.snackBar.open(error, '', { duration: 3000 });
    });
  }

}
