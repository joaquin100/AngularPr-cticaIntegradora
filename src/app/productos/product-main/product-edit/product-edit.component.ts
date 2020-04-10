import { Component, OnInit } from '@angular/core';
import { Router,Params, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  id: number;
  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {
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


}
