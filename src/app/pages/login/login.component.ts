import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mail: string = "";
  password: string = "";

  constructor(private service: AuthService) {
  }
  handleSubmit(valid: boolean) {
    if (valid) {
      this.service.login(this.mail, this.password)
        .subscribe(user => console.log("USER",user))

    }
  }
}
