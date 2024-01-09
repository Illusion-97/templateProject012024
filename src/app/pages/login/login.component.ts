import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mail: string = "";
  password: string = "";

  handleSubmit(valid: boolean) {
    if (valid) console.log("CREDENTIAL", {
      email: this.mail,
      password: this.password
    })
  }
}
