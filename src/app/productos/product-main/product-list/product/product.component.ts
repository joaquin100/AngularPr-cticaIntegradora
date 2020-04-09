import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //Recibes inputs del padre
  ////Nombre, ID, desc, precio || index (ngfor)
  constructor() { }

  ngOnInit(): void {
  }

  //Event binding que a
}
