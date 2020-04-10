import { Component, OnInit,Input } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

  //Event binding que a
}
