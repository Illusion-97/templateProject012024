import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getFormControl, hasError, isInvalid} from "../../tools/reactive-forms-tool";

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent {

  form : FormGroup = new FormGroup<any>({
    imageSrc: new FormControl('', [Validators.required]),
    imageAlt: new FormControl(''),
    titre: new FormControl('', [Validators.required, Validators.minLength(10)]),
    description: new FormControl('', [Validators.required]),
    postLink: new FormControl('', [Validators.required])
  })

  handleSubmit() {
    // Toujours en premier
    if(this.form.valid) {
      console.log("POST",this.form.value)
    }
  }

  stringify(value: any): string {
    return JSON.stringify(value)
  }

  get titre() {
    return getFormControl(this.form, "titre")
  }

  get titreInvalid() {
    return isInvalid(this.titre)
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
