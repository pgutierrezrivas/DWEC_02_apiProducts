import { Component } from '@angular/core';
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { ProductFilterComponent } from "./components/product-filter/product-filter.component";

@Component({
  selector: 'app-root',
  imports: [ProductsListComponent, ProductFormComponent, ProductFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carga-api-series';
}
