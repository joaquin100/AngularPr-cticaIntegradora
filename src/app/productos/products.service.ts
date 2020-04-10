import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productos:Product[];
  prod:Product;
  filtrados: Product[];
  especificacion: Especificacion[]; //Duda no sé si mandar esto o []

  productSubject = new Subject<Product[]>();

  constructor() {
    this.productos = [
      new Product(12,"Smartphone","LG","Quadcore 3GHZ", 12018.5,5,[]),
      new Product(123,"Smartwatch", "Sony", "3GB Ram", 4999.9,0,[]),
      new Product(34,"SmartTV", "Sony", "52 pulgadas, Conexión wifi", 8999.9,3,[])
    ]

    this.filtrados = this.productos.slice();

    this.productSubject.next(this.getProducts());

  }

  getProducts():Product[]{
    return this.productos.slice();
  }

  getProduct(id:number):Product{
    console.log(id);
    this.prod = this.productos.find(prod => prod.uid = id);
    console.log(this.prod);
    return this.prod;
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
