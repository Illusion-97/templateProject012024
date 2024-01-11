import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = "http://localhost:3000";
  USER_STORAGE_KEY = "USER"

  users : User[] = [{
    id:         0,
    username:   "Yanis",
    email:      "yanis971.60@gmail.com",
    password:   "123456789",
    icon:      ""
  }]
  loginResponse: BehaviorSubject<LoginResponse | undefined> = new BehaviorSubject<LoginResponse | undefined>(undefined);
  
  currentUser : Observable<User | undefined> = this.loginResponse.pipe(map(login => login?.user));
  
  get token() {return this.loginResponse.value?.accessToken} 
  
  constructor(private router: Router, private toast: HotToastService, private http : HttpClient) {
    this.loginResponse.subscribe({
      next: user => {
        if(user) sessionStorage.setItem(this.USER_STORAGE_KEY,JSON.stringify(user))
      }
    })
    const sessionUser = sessionStorage.getItem(this.USER_STORAGE_KEY)
    if(sessionUser) this.loginResponse.next(JSON.parse(sessionUser))
   }

  login(email: string, password: string): Observable<User> {

    /*return this.http.get<User[]>(`${this.API_URL}/users`).pipe(map(users => {
      const foundUser = users.filter(user => user.email === email && user.password === password)[0]
      if (this.currentUser) this.toast.success(`Bienvenue : ${this.currentUser.username}`)
      this.currentUser = foundUser;
      this.router.navigate(["/formulaire"])
      return foundUser;
    }))*/

    //return foundUser;
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, {email: email, password: password})
      .pipe(map(response => {
        this.loginResponse.next(response);
        this.router.navigate(["/formulaire/group/0"])
        return response.user;
      }))
  }

  register(user: User) {
    this.http.post<LoginResponse>(`${this.API_URL}/register`, user)
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
    this.loginResponse.next(undefined);
    sessionStorage.clear()
    this.toast.success(`Déconnecté !`)
    this.router.navigate(["/login"])
  }

  isLogged(): Observable<boolean> {
    // Vérifie que la valeur n'est pas 'falsy'
    return this.currentUser.pipe(map(value => !!value))
  }
}

interface LoginResponse {
  accessToken: string;
  user: User
}
