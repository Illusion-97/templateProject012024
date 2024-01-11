import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service : AuthService, private toast : HotToastService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.service.isLogged().pipe(map(logged => {
      if(logged) return true
      else {
        this.toast.error("Veuillez vous connecter.")
        return new UrlTree();  // new UrlTree() -> page d'acceuil
      }}));
  }
  
}

export const authGuard = () => {
    return inject(AuthService).isLogged().pipe(map(logged => {
      if(logged) return true
      else {
        inject(HotToastService).error("Veuillez vous connecter.")
        return new UrlTree();  // new UrlTree() -> page d'acceuil
      }}));
}