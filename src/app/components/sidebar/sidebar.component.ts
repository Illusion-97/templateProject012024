import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  active: boolean = false;

  href: string = "#";
  src: string = "pic07.jpg";
  alt: string = "img";
  text: string = "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam.";

  minipostclass: MiniPostClass = new MiniPostClass("#", "pic08.jpg", "image2", this.text);

  minipostdefault: MiniPostClassDefault;

  minipostInterface : MiniPost = {
    alt: "image3",
    href: "#",
    src: "pic10.jpg",
    text: this.text
  }

  miniposts: MiniPost[] = [
    {
      alt: "image4",
      href: "different",
      src: "pic10.jpg",
      text: this.text
    },
    {
      alt: "image5",
      href: "#",
      src: "pic10.jpg",
      text: this.text
    },
    {
      alt: "image3",
      href: "#",
      src: "",
      text: this.text
    }
  ]

  constructor(private service: AuthService) {
    this.minipostdefault = new MiniPostClassDefault();
    this.minipostdefault.src = "pic09.jpg"
    this.minipostdefault.text = this.text;
  }

  onClick(): void {
    alert(this.text)
  }

  // On se dispense de cette fonction en respectant la syntaxe du Two Way Data Binding
  onChange(event: string): void {
    this.text = event;
  }

  logout() {
    this.service.logout();
  }

  get isLogged(): boolean {
    // Vérifie que la valeur n'est pas 'falsy'
    return !!this.service.currentUser
  }
}

class MiniPostClass {
  href: string;
  src: string;
  alt: string;
  text: string;

  constructor(href: string, src: string, alt: string, text: string) {
    this.href = href;
    this.src = src;
    this.alt = alt;
    this.text = text;
  }
}

class MiniPostClassDefault {
  href: string = "#";
  src: string = "";
  alt: string = "";
  text?: string; // variable? :type -> permet d'ajouter 'undefined' aux types (rentre l'attribut optionnel)
}

interface MiniPost {
  href?: string;
  src?: string ;
  alt?: string;
  text: string;
}
