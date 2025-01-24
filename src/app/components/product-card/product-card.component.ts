import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  productService = inject(ProductService);

  @Input() myProduct!: IProduct;

  deleteProduct(product: IProduct) {
    this.productService.deleteById(product._id);
  }

}
