import {AbstractControl, FormGroup} from "@angular/forms";

export function getFormControl(form: FormGroup, controlName: string): AbstractControl | undefined {
  // récupérer un FormControl contenu dans un FormGroup à partir de son nom
  return form.controls[controlName];
}

export function isInvalid(control: AbstractControl | undefined) {
  // pour savoir si un control est actuellement invalide
  return control?.invalid && control?.touched
}

export function hasError(control: AbstractControl | undefined, errorCode: string) {
  return control?.dirty && control?.hasError(errorCode)
}
