import { Component, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { Router,Params, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  modeInventario:boolean;//false sería modo monitoreo
  productList :Product[];
  productosMonitoreadosList:Product[];
  inputValue = "";
  addMonitoreados = false;
  productosMonitoreadosBooleans:boolean[];
  
  constructor(private productService:ProductsService,private router: Router) { 
    this.productList = productService.getProducts();
    this.productosMonitoreadosList = productService.getProductosMonitoreados();
    this.productosMonitoreadosBooleans = productService.getProductosMonitoradosBooleans();

    console.log(this.productList);
    console.log(this.productosMonitoreadosList);
    console.log(this.productosMonitoreadosBooleans);

    this.productService.productSubject.subscribe(data=>{
      console.log("Updating data products",data);
      this.productList = data;
    })

    this.productService.productMonitoreadosSubject.subscribe(data=>{
      console.log("Updating monitoreados",data);
      this.productosMonitoreadosList = data;
    })

    this.productService.productMonitoreadosBooleanSubject.subscribe(data=>{
      console.log("Updating booleans");
      this.productosMonitoreadosBooleans = data;
    })

  }

  ngOnInit(): void {
    //monitoreo
    if(this.router.url.includes("monitoreo")){
      this.modeInventario = false;
    }
    else{
      this.modeInventario = true;
    }
  }

  eliminar(index){
    console.log("El padre eliminará",index);
    this.productService.eliminateProduct(index,this.modeInventario);
  }



 sendToMonitoreados(position){
    this.addMonitoreados = true;
    this.productService.toMonitoreados(position);
    console.log(this.productosMonitoreadosBooleans);

  }

  addToMonitoreados(){
    console.log("Agregando a monitoreados");
    this.productService.addMonitoreados();
    console.log("Monitoreados",this.productosMonitoreadosList);

  }


  buscar(){
    console.log("Buscando");
    this.productService.filtrandoProductos(this.inputValue);
  }

}
