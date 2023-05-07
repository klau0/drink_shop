import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  async login(email: string, password: string) {
    const x = await this.auth.signInWithEmailAndPassword(email, password);
    localStorage.setItem('user', JSON.stringify(x));
    return x;
  }

  async signup(email: string, password: string) {
    const x = await this.auth.createUserWithEmailAndPassword(email, password);
    localStorage.setItem('user', JSON.stringify(x));
    return x;
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    localStorage.removeItem("user");
    return this.auth.signOut();
  }
}
