import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TwoWayBindingComponent } from './components/two-way-binding/two-way-binding.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TruncatePipe } from './pipes/truncate.pipe';
import { HomeComponent } from './pages/home/home.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { EditorComponent } from './pages/editor/editor.component';
import {HotToastModule} from "@ngneat/hot-toast";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TwoWayBindingComponent,
    TruncatePipe,
    HomeComponent,
    FormulaireComponent,
    FormControlComponent,
    FormGroupComponent,
    RegisterComponent,
    LoginComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HotToastModule.forRoot({
      theme: "snackbar",
      autoClose: true,
      duration: 1000
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
