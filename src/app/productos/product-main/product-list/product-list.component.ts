import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  modeInventario = true;//false sería modo monitoreo
  
  constructor() { }

  ngOnInit(): void {
  }

}
