import { Component } from '@angular/core';
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";

@Component({
  selector: 'app-root',
  imports: [ProductsListComponent, ProductFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carga-api-series';
}
