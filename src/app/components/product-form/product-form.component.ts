import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {v4 as uuidv4} from 'uuid'; //https://www.uuidgenerator.net/dev-corner/typescript
import { IProduct } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  myProductForm: FormGroup;
  productService = inject(ProductService); /**injecto el servicio para poder usar el 
  metodo añadir un producto (addProduct)*/

  constructor() {
    //inicializo las variables en el constructor
    this.myProductForm = new FormGroup({
      _id: new FormControl(uuidv4(), []), //genero un UUID al inicializar
      name: new FormControl(null, [Validators.required, 
        Validators.minLength(3), Validators.maxLength(50),]),
      description: new FormControl(null, [Validators.required, 
        Validators.minLength(10), Validators.maxLength(100),]),
      price: new FormControl(null, [Validators.required, 
        Validators.min(0), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]),
      category: new FormControl("", [Validators.required]),
      image: new FormControl(null, [Validators.required, 
        Validators.pattern('https?://.+')]),
      active: new FormControl(null, [Validators.required])
    }, [])
  
  }

  //funcion reseteo del formulario
  resetForm() {
    this.myProductForm.reset(); //reinicio todos los campos del formulario
    this.myProductForm.get('_id')?.setValue(uuidv4()); //asigno un nuevo UUID al campo '_id' al resetear
    this.myProductForm.get('category')?.setValue(""); /**asigno de nuevo el valor "" al selector de categoria 
    para que muestre la opcion de 'Elegir categoria' del desplegable al resetear*/
  }

  /**funcion que NO RECIBE PARAMETROS y que se ejecuta en el submit donde recogemos la informacion 
  del formulario (genera objeto json)*/
  getDataForm() {
    if (this.myProductForm.valid) {
      let newProduct: IProduct = this.myProductForm.value as IProduct;
      this.productService.addProduct(newProduct); //añado el producto a traves del servicio
      this.resetForm(); //reseteo el formulario para el siguiente ingreso
      console.log('Producto añadido: ', newProduct);
      alert('PRODUCTO AÑADIDO CORRECTAMENTE');
    } else {
      console.log('Formulario no válido', this.myProductForm.errors);
      alert('ERROR PRODUCTO NO AÑADIDO INTÉNTELO DE NUEVO');
    }
  }

  //funcion generica para poder hacer el control del formulario
  checkControl(formControlName: string, validator: string): boolean | undefined {
    return (this.myProductForm.get(formControlName)?.hasError(validator) &&
    this.myProductForm.get(formControlName)?.touched)
  }

}
