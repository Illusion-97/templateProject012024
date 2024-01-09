import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {EditorComponent} from "./pages/editor/editor.component";
import {FormulaireComponent} from "./components/formulaire/formulaire.component";
import {FormControlComponent} from "./components/form-control/form-control.component";
import {FormGroupComponent} from "./components/form-group/form-group.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "formulaire", component: EditorComponent, children: [
      {path: "", component: FormulaireComponent},
      {path: "control", component: FormControlComponent},
      {path: "group", component: FormGroupComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
