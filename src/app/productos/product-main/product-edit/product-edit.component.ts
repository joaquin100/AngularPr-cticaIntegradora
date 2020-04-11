import { Component, OnInit } from '@angular/core';
import { Router,Params, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Product, Especificacion } from '../../Product';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  modoAgregar = true;//modo /products/new
  id: number;
  marcas = ["HP","Sony","LG"];
  especificaciones = [];
  product:Product;

  especificacionesIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {
    this.product = new Product(0,"","","",0,0,[new Especificacion("","","")]);
    this.route.params.subscribe((params) => this.id = params['id'])
  }

  editar() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }
  regresar() {
    this.router.navigate(['/products']);
    //Otra forma para regresar a la ruta anterior
    this.location.back();
  }

  agregarEspecificacion(){
    console.log("Agregando especificación");
    this.product.especificacion.push(new Especificacion("","",""));
    this.especificacionesIndex++;
  }


}
