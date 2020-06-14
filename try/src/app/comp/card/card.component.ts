import { Component ,Input} from '@angular/core';
@Component({
    templateUrl:'./card.component.html',
    selector:'card',
    styleUrls:['./card.component.css']
})
export class Card{
   @Input() title:string;
   @Input() content:string;
   @Input() id :number;
}