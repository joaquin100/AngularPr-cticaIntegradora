import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Product } from '../../../Product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //Recibes inputs del padre
  ////Nombre, ID, desc, precio || index (ngfor)
  @Input() product:Product;
  @Input() position:number;

  @Output() positionToEliminate = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

  eliminarElemento(){
    console.log("posición del elemento a eliminar",this.positionToEliminate);
    this.positionToEliminate.emit(this.position);  
  }

}
