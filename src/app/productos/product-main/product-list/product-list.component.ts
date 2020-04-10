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
  inputValue = "";
  
  constructor(private productService:ProductsService) { 
    this.productList = productService.getProducts();
    console.log(this.productList);

    this.productService.productSubject.subscribe(data=>{
      console.log("Updating data",data);
      this.productList = data;
    })

  }

  ngOnInit(): void {
  }

  eliminar(index){
    console.log("El padre eliminará",index);
    this.productService.eliminateProduct(index);
  }

  buscar(){
    console.log("Buscando");
    this.productService.filtrandoProductos(this.inputValue);
  }

}
