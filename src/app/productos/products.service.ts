import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productos:Product[];
  filtrados: Product[];

  productSubject = new Subject<Product[]>();

  constructor() {
    this.productos = [
      new Product(12,"Smartphone","LG","Quadcore 3GHZ", 12018.5,5,
      [new Especificacion("memoria ram",4,"GB"),new Especificacion("memoria interna",64,"GB"),
      new Especificacion("SO","android 9","")]),
      new Product(123,"Smartwatch", "Sony", "3GB Ram", 4999.9,0,
      []),
      new Product(34,"SmartTV", "Sony", "52 pulgadas, Conexión wifi", 8999.9,3,
      [])
    ]

    this.filtrados = this.productos.slice();

    this.productSubject.next(this.getProducts());

  }

  getProducts():Product[]{
    return this.productos.slice();
  }

  getProduct(id:number):Product{
    console.log(id);
    let prod = this.productos.find(prod => prod.uid == id);
    console.log("console del servicio",prod);
    return Object.assign({},prod);
  }

  addProduct(){
    
  }

  editProduct(){

  }

  eliminateProduct(position:number){
    console.log("Eliminando la posición", position);
    this.productos.splice(position,1);
    this.productSubject.next(this.getProducts());
  }

  filtrandoProductos(inputValue:string){
    console.log("Filtrando");
    
    this.filtrados = this.productos.filter(p => p.nombre.toUpperCase().includes(inputValue.toUpperCase())
        || p.descripcion.toUpperCase().includes(inputValue.toUpperCase())); 

    this.productSubject.next(this.filtrados);   
  }

}
