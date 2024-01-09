import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users : User[] = []
  constructor() { }

  login(email: string, password: string): User | undefined {
    return this.users.filter(user => user.email === email && user.password === password)[0]
  }

  register(user: User) {
    user.id = this.users.length + 1;
    this.users.push(user);
  }
}
