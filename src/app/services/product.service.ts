import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'https://jsonblob.com/api/1332065737166217216';
  private arrProducts: IProduct[];

  constructor() {
    //inicializo las variables en el constructor
    this.arrProducts = [];
    //obtengo los datos mediante el fetch consultando la API
    fetch(this.apiURL)
      .then(response => response.json())
      .then(products => {
        products.forEach((element: any) => {
          let product = element as IProduct;
          product.visible = true;  //inicializo 'visible' en true para todos los productos
          this.arrProducts.push(product);
        });
      });
  }

  //obtener todos los productos
  getAllProducts(): IProduct[] {
    return this.arrProducts;
  }
  
  //implementacion del borrado en memoria
  deleteById(id: string): IProduct[] {
    let i = this.arrProducts.findIndex(product => product._id === id);

    if (i != -1 && i>=0 && i < this.arrProducts.length) {
      this.arrProducts.splice(i, 1);
    }

    return this.arrProducts;
  }

  //añadimos los nuevos productos creados al array
  addProduct(product: IProduct): void {
    this.arrProducts.push(product);
    //muestro el array de productos incluyendo el nuevo
    console.log('Productos actuales:', this.arrProducts);
  }

  //filtrar productos
  filterProducts(filters: any): void {
    //recorro el array con todos los productos
    this.arrProducts.forEach(product => {
      //inicializo 'visible' a true por defecto
      product.visible = true;

      //filtro por nombre
      if (filters.name && filters.name.trim() !== '') {
        if (!product.name.toLowerCase().includes(filters.name.toLowerCase())) {
          product.visible = false;  //si el nombre no coincide, lo hago invisible
        }
      }

      //filtro por categoria
      if (filters.category && filters.category.trim() !== '') {
        if (!product.category.toLowerCase().includes(filters.category.toLowerCase())) {
          product.visible = false;
        }
      }

      //filtro por precio minimo
      if (filters.priceMin !== null) {
        if (product.price < filters.priceMin) {
          product.visible = false;
        }
      }

      //filtro por precio maximo
      if (filters.priceMax !== null) {
        if (product.price > filters.priceMax) {
          product.visible = false;
        }
      }

      //filtro por estado activo
      if (filters.active !== null) {
        if (product.active !== filters.active) {
          product.visible = false;
        }
      }

    });

    console.log('Productos después del filtro:', this.arrProducts);
  }

}