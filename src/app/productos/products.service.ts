import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productos:Product[];
  especificacion:Especificacion[];

  constructor() {
    this.productos = [
      new Product(12,"Smartphone","LG","Quadcore 3GHZ", 12018.5,5,this.especificacion.slice()),
      new Product(123,"Smartwatch", "Sony", "3GB Ram", 4999.9,0,this.especificacion.slice()),
      new Product(34,"SmartTV", "Sony", "52 pulgadas, Conexión wifi", 8999.9,3,this.especificacion.slice())
    ]

  }

  getProduct():Product[]{
    return this.productos.slice();
  }

  addProduct(){
    
  }

  editProduct(){

  }

  eliminateProduct(){
    
  }

}
