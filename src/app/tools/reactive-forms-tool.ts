import {AbstractControl, FormGroup} from "@angular/forms";

export function getFormControl(form: FormGroup, controlName: string): AbstractControl | undefined {
  // récupérer un FormControl contenu dans un FormGroup à partir de son nom
  return form.controls[controlName];
}

export function isControlInvalid(form: FormGroup, controlName: string) {
  // pour savoir si un control est actuellement invalide
  const control = getFormControl(form,controlName);
  return control?.invalid && control?.touched
}

export function hasControlError(form: FormGroup, controlName: string, errorCode: string) {
  return  getFormControl(form,controlName)?.hasError(errorCode);
}
