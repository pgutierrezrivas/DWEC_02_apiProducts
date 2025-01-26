import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/iproduct';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  arrProducts: IProduct[] = [];
  productService = inject(ProductService); //injecto el servicio

  ngOnInit(): void {
    this.arrProducts = this.productService.getAllProducts(); //llamo al servicio
  }

}
