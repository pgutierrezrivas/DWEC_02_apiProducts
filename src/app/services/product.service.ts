import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'https://jsonblob.com/api/1332065737166217216';
  private arrProducts: IProduct[];

  constructor() {
    this.arrProducts = []; //inicializo la variable en el constructor
    //obtengo los datos mediante el fetch consultando la API
    fetch(this.apiURL)
      .then(response => response.json())
      .then(products => {
        products.forEach((element: any) => {
          let product = element as IProduct;
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

}