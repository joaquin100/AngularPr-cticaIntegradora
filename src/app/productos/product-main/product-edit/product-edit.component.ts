import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,Params, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Product, Especificacion } from '../../Product';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  modoAgregar:boolean;//modo /products/new
  id: number;
  marcas = ["HP","Sony","LG"];
  especificaciones = new Especificacion("","","");
  product:Product;

  constructor(private productService:ProductsService,private router: Router, private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {
    
    //this.route.params.subscribe((params) => this.id = params['id'])
      if(this.router.url.includes("edit") == true){
        console.log("Modo editar")
        this.modoAgregar = false;
        this.route.params.subscribe((params) =>{
          this.id = params['id'];
          this.product = this.productService.getProduct(this.id);
          console.log(this.product);
        });
      }else{
        this.modoAgregar = true;
        this.product = new Product(0,"","","",0,0,[]);
      }

  }

  editar() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }
  regresar() {
    //this.router.navigate(['/products']);
    //Otra forma para regresar a la ruta anterior
    this.location.back();
  }

  regresarAproductos() {
    this.router.navigate(['/products']);
    //Otra forma para regresar a la ruta anterior
  }

  agregarEspecificacion(){
    console.log("Agregando especificación");
    console.log(this.especificaciones);
    this.product.especificacion.push(this.especificaciones);
    this.especificaciones = new Especificacion("","","");
  }

  submit(formulario:NgForm){
    if(formulario.valid == true && this.modoAgregar == true){
      console.log("Formulario",formulario);
      console.log("Product to add",this.product);
      this.productService.addProduct(Object.assign({},this.product));
      this.regresar();
    }
    else if(formulario.valid == true && this.modoAgregar == false){
      //Se va a editar el producto
      console.log("Voy a editar");
      this.productService.editProduct(Object.assign({},this.product));
      this.regresarAproductos();
    }
    else{
      console.log("Me voy a regresar");
      this.regresar();
    }
    
  }

  eliminarEspecificacion(index:number){
    console.log("índice de la especificación a borrar",index);
    console.log("product to edit especificaciones",this.product);
    this.product.especificacion.splice(index,1);
    console.log("product especificaciones eliminadas",this.product);
  }



}
