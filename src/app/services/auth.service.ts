import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users : User[] = [{
    id:         0,
    username:   "Yanis",
    email:      "yanis971.60@gmail.com",
    password:   "123456789",
    icon:      ""
  }]
  currentUser? : User;
  constructor(private router: Router, private toast: HotToastService) { }

  login(email: string, password: string): User | undefined {
    const foundUser = this.users.filter(user => user.email === email && user.password === password)[0]
    this.currentUser = foundUser;
    if(this.currentUser)
    this.router.navigate(["/formulaire"]).then(
      () => this.toast.success(`Bienvenue : ${this.currentUser?.username}`, {autoClose: true, duration: 200})
    )
    return foundUser;
  }

  register(user: User) {
    user.id = this.users.length + 1;
    this.users.push(user);
    this.toast.success(`Enregistré avec l'id : ${user.id}`)
    this.router.navigate(["/login"])
  }

  logout() {
    this.currentUser = undefined;
    this.toast.success(`Déconnecté !`)
    this.router.navigate(["/login"])
  }
}
