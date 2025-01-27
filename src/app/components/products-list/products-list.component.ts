import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/iproduct';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductFilterComponent } from "../product-filter/product-filter.component";
import { ProductFormComponent } from "../product-form/product-form.component";

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent, ProductFilterComponent, ProductFormComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
//escucha el evento emitido por el componente de filtros
export class ProductsListComponent implements OnInit {

  arrProducts: IProduct[] = [];
  
  productService = inject(ProductService); //injecto el servicio

  ngOnInit(): void {
    this.arrProducts = this.productService.getAllProducts(); //llamo al servicio
    console.log('Productos cargados:', this.arrProducts);
  }

  //metodo que se ejecuta cuando los filtros cambian 
  onFiltersChange(filters: any): void {
    this.productService.filterProducts(filters);
    alert('PRODUCTOS FILTRADOS');
    console.log('Productos filtrados:', this.arrProducts);
  }

}