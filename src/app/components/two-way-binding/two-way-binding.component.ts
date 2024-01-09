import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-two-way-binding',
  templateUrl: './two-way-binding.component.html',
  styleUrls: ['./two-way-binding.component.css']
})
export class TwoWayBindingComponent {
  @Input() // Permet d'indiquer que le composant peut recevoir un attribut
  value: string = "defaultValue"

  @Output() // Permet d'émettre des valeurs d'un type précisé, ici 'string'
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  onChange(event: Event) {
    //@ts-ignore
    this.value = event.target.value;
    this.valueChange.emit(this.value); // Déclenche un évènement en passant l'information de this.value
  }
}
