import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getFormControl, hasError, isInvalid} from "../../tools/reactive-forms-tool";
import {PostService} from "../../services/post.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent {

  form : FormGroup = new FormGroup<any>({
    id: new FormControl(0, [Validators.required]),
    imageSrc: new FormControl('', [Validators.required]),
    imageAlt: new FormControl(''),
    titre: new FormControl('', [Validators.required, Validators.minLength(10)]),
    description: new FormControl('', [Validators.required]),
    postLink: new FormControl('', [Validators.required])
  })

  constructor(private service: PostService, private router: Router, private route: ActivatedRoute, private toast: HotToastService) {
    /*route.paramMap.subscribe({
      next: param => {
        const id = Number(param.get('id') || 0)
        if(id !== 0) {
          service.get(id).subscribe({
            next: post => {
              this.form.patchValue(post)
            }
          })
        }
      }
    })*/
    route.data.subscribe({
      next: ({post}) => {
        if(post) this.form.patchValue(post)
      }
    })
  }

  handleSubmit() {
    // Toujours en premier
    if(this.form.valid) {
      let method : Observable<any>;
      if(this.form.value.id) {
        method = this.service.update(this.form.value)
      } else {

        method = this.service.save(this.form.value)
      }
      
      // Notification via popup de l'état de la requête
      //(this.form.value.id ? this.service.update(this.form.value) : this.service.save(this.form.value)).pipe(this.toast.observe({
      method.pipe(this.toast.observe({
        loading: "Sauvegarde en cours",
        success: "Sauvegardé !",
        error: err => err.error
      }))
      .subscribe({
        next: response => {
          this.form.reset({
            imageSrc:"",
            imageAlt:"",
            titre:"",
            description:"",
            postLink:"#"});
          this.router.navigate(["/"])
        },
        error: err => {

        }
      })
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

export const formResolver = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const id = Number( route.paramMap.get("id") || 0)
  return id === 0 ? {
    id: 0,
    imageSrc:"",
    imageAlt:"",
    titre:"",
    description:"",
    postLink:"#"}
    : inject(PostService).get(id)
}