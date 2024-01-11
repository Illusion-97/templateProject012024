import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {EditorComponent} from "./pages/editor/editor.component";
import {FormulaireComponent} from "./components/formulaire/formulaire.component";
import {FormControlComponent} from "./components/form-control/form-control.component";
import {FormGroupComponent, formResolver} from "./components/form-group/form-group.component";
import { AuthGuard, authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "formulaire", component: EditorComponent, canActivate: [authGuard], children: [
      {path: "", component: FormulaireComponent},
      {path: "control", component: FormControlComponent},
      {path: "group/:id", component: FormGroupComponent, resolve: {
        post: formResolver
      }},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
