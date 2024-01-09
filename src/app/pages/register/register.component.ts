import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getFormControl, isInvalid, hasError, mustMatch} from "../../tools/reactive-forms-tool";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  confirmPassword: FormControl = new FormControl('', [Validators.required])
  form : FormGroup = new FormGroup<any>({
    username:   new FormControl('', [Validators.required]),
    email:      new FormControl('', [Validators.required, Validators.email]),
    password:   new FormControl('', [Validators.required, Validators.minLength(8), mustMatch(this.confirmPassword)]),
    icon:      new FormControl(''),
  })

  handleSubmit() {
    // Toujours en premier
    if(this.form.valid) {
      console.log("USER",this.form.value)
    }
  }

  getControl(name: string) {
    return getFormControl(this.form, name)
  }

  isInvalid(name: string) {
    return isInvalid(this.getControl(name))
  }

  hasError(name: string, errorCode: string) {
    return hasError(this.getControl(name), errorCode)
  }
}
