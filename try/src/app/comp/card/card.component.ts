import { Component ,Input, ViewEncapsulation} from '@angular/core';
@Component({
    templateUrl:'./card.component.html',
    selector:'card',
    styleUrls:['./card.component.css'],
    encapsulation:ViewEncapsulation.None
})
export class Card{
   @Input() title:string;
   @Input() content:string;
   @Input() id :number;
}