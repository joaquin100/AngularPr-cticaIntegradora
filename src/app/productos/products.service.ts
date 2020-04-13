import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productos: Product[];
  filtrados: Product[];
  productosMonitoreados: Product[];
  productosMonitoreadosBooleans: boolean[];

  productSubject = new Subject<Product[]>();
  productMonitoreadosSubject = new Subject<Product[]>();
  productMonitoreadosBooleanSubject = new Subject<boolean[]>();

  constructor() {
    this.productos = [
      new Product(12, "Smartphone", "LG", "Quadcore 3GHZ", 12018.5, 5,
        [new Especificacion("memoria ram", 4, "GB"), new Especificacion("memoria interna", 64, "GB"),
        new Especificacion("SO", "android 9", "")]),
      new Product(123, "Smartwatch", "Sony", "3GB Ram", 4999.9, 0,
        []),
      new Product(34, "SmartTV", "Sony", "52 pulgadas, Conexión wifi", 8999.9, 3,
        [])
    ]
    this.productosMonitoreados = []
    this.productosMonitoreadosBooleans = [false, false, false];

    this.filtrados = this.productos.slice();

    this.productSubject.next(this.getProducts());

    this.productMonitoreadosSubject.next(this.getProductosMonitoreados());

    this.productMonitoreadosBooleanSubject.next(this.getProductosMonitoradosBooleans());

  }

  getProducts(): Product[] {
    return this.productos.slice();
  }

  getProductosMonitoreados(): Product[] {
    return this.productosMonitoreados.slice();
  }

  getProductosMonitoradosBooleans(): boolean[] {
    return this.productosMonitoreadosBooleans.slice();
  }

  getProduct(id: number): Product {
    console.log(id);
    let prod = this.productos.find(prod => prod.uid == id);
    console.log("console del servicio", prod);
    return Object.assign({}, prod);
  }

  addProduct(newProduct: Product) {
    console.log("Añadiendo productos");
    this.productos.push(newProduct);
    this.productosMonitoreadosBooleans.push(false);
    this.productSubject.next(this.getProducts());
    this.productMonitoreadosBooleanSubject.next(this.getProductosMonitoradosBooleans());
  }

  editProduct(productToEdit: Product) {
    console.log("Editando producto:", productToEdit);
    let positionToEdit = this.productos.findIndex((prod) => prod.uid == productToEdit.uid);
    console.log("position to edit", positionToEdit);
    this.productos.splice(positionToEdit, 1, productToEdit);
    this.productSubject.next(this.getProducts());
    this.productMonitoreadosBooleanSubject.next(this.getProductosMonitoradosBooleans());
  }

  eliminateProduct(position: number, modeInventario: boolean) {
    console.log("modo inventario",modeInventario);
    if (modeInventario == true) {
      console.log("Eliminar en modo inventario");
      console.log("Eliminando la posición", position);
      let productToEliminateInMonitoreados = Object.assign({}, this.productos[position]);
      console.log("producto a eliminar en monitoreados",productToEliminateInMonitoreados);

      let existeEnMonitoreados = this.productosMonitoreados.find((prod)=>prod.uid = productToEliminateInMonitoreados.uid);
      if(existeEnMonitoreados){
        let positionInMonitoreados = this.productosMonitoreados.findIndex((prod)=>prod.uid = productToEliminateInMonitoreados.uid);
        this.productosMonitoreados.splice(positionInMonitoreados,1);
        this.productMonitoreadosSubject.next(this.getProductosMonitoreados());
      }
      this.productos.splice(position, 1);
      this.productosMonitoreadosBooleans.splice(position, 1);
      
      this.productSubject.next(this.getProducts());
      this.productMonitoreadosBooleanSubject.next(this.getProductosMonitoradosBooleans());
    }else{
      console.log("Eliminar en modo monitoreado");
      console.log("position a eliminar en Monitoreados",position);
      this.productosMonitoreados.splice(position,1);
      this.productMonitoreadosSubject.next(this.getProductosMonitoreados());
    }
  }

  filtrandoProductos(inputValue: string) {
    console.log("Filtrando");

    this.filtrados = this.productos.filter(p => p.nombre.toUpperCase().includes(inputValue.toUpperCase())
      || p.descripcion.toUpperCase().includes(inputValue.toUpperCase()));

    this.productSubject.next(this.filtrados);
  }

  filtradoMonitoreados(inputValue: string){
    console.log("Filtrando Monitoreados");

  }

  toMonitoreados(position: number) {
    this.productosMonitoreadosBooleans[position] = true;
    this.productMonitoreadosBooleanSubject.next(this.getProductosMonitoradosBooleans());

  }

  addMonitoreados() {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productosMonitoreadosBooleans[i] == true) {
        let exists = this.productosMonitoreados.find((prod) => prod.uid == this.productos[i].uid)
        if (exists) {
        } else {
          this.productosMonitoreados.push(Object.assign({}, this.productos[i]));
        }
      }

    }

    for(let i=0; i < this.productosMonitoreadosBooleans.length; i++){
      this.productosMonitoreadosBooleans[i] = false;
    }
    this.productMonitoreadosSubject.next(this.getProductosMonitoreados());
    this.productMonitoreadosBooleanSubject.next(this.getProductosMonitoradosBooleans());

  }

  ExisteEsteId(id: number): boolean {
    let productoYaExitente = this.productos.find(prod => prod.uid == id);
    if (productoYaExitente) {
      return true;
    }
    else {
      return false;
    }
  }

}
