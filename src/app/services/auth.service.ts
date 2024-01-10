import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = "http://localhost:3000";

  users : User[] = [{
    id:         0,
    username:   "Yanis",
    email:      "yanis971.60@gmail.com",
    password:   "123456789",
    icon:      ""
  }]
  currentUser? : User;
  constructor(private router: Router, private toast: HotToastService, private http : HttpClient) { }

  login(email: string, password: string): Observable<User> {

    /*return this.http.get<User[]>(`${this.API_URL}/users`).pipe(map(users => {
      const foundUser = users.filter(user => user.email === email && user.password === password)[0]
      if (this.currentUser) this.toast.success(`Bienvenue : ${this.currentUser.username}`)
      this.currentUser = foundUser;
      this.router.navigate(["/formulaire"])
      return foundUser;
    }))*/

    //return foundUser;
    return this.http.post<RegisterResponse>(`${this.API_URL}/login`, {email: email, password: password})
      .pipe(map(response => {
        const foundUser = response.user
        this.currentUser = foundUser;
        this.router.navigate(["/formulaire"])
        return foundUser;
      }))
  }

  register(user: User) {
    this.http.post<RegisterResponse>(`${this.API_URL}/register`, user)
      // Tant qu'on n'a pas souscrit à l'observable la requête ne part pas
      .subscribe(
        response => {
          console.log(response.user.id)
          this.toast.success(`Enregistré avec l'id : ${response.user.id}`)
          this.router.navigate(["/login"])
        }
    )
  }

  logout() {
    this.currentUser = undefined;
    this.toast.success(`Déconnecté !`)
    this.router.navigate(["/login"])
  }
}

interface RegisterResponse {
  accessToken: string;
  user: User
}
