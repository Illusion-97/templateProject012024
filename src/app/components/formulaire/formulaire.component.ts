import { Component } from '@angular/core';
import {Post} from "../../models/post";

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {

  post : Post = {
    imageSrc: "",
    imageAlt: "",
    titre: "",
    description: "",
    postLink: ""
  }

  handleSubmit(valid: boolean) {
    if (valid) console.log(this.post)
  }
}
