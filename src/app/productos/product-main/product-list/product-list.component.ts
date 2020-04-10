import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Product } from '../../Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  modeInventario = true;//false sería modo monitoreo
  productList :Product[];
  
  constructor(private productService:ProductsService) { 
    this.productList = productService.getProducts();
    console.log(this.productList);

  }

  ngOnInit(): void {
  }

}
