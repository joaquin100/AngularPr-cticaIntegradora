import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../Product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //Recibes inputs del padre
  ////Nombre, ID, desc, precio || index (ngfor)

  checkBoxValue = false;

  @Input() product: Product;
  @Input() position: number;
  @Input() modoProductos: Boolean;

  @Output() positionToEliminate = new EventEmitter;
  @Output() productToMonitoreados = new EventEmitter;
  //@Output() checkBoxValueEmitter = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

  eliminarElemento() {
    console.log("posición del elemento a eliminar", this.positionToEliminate);
    this.positionToEliminate.emit(this.position);
  }

  enviarAmonitoreados() {
    console.log("Enviando info para añadir a monitoreados");
    this.productToMonitoreados.emit(this.position);
  }
}
