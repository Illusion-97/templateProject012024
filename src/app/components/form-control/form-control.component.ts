import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent {
  formControlTitre : FormControl = new FormControl<any>('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(50)
  ])

  handleSubmit() {
    alert(this.formControlTitre.invalid ? 'Titre invalide' : this.formControlTitre.value)
  }

  get invalid() : boolean {
    return this.formControlTitre.invalid && this.formControlTitre.touched
  }
}
