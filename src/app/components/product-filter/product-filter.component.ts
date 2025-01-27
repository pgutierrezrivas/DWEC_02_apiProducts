import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
//capturo los valores de los filtros mediante inputs del formulario
export class ProductFilterComponent {

  @Output() onFilterChange: EventEmitter<any> = new EventEmitter(); //emito los valores seleccionados

  //fitros iniciales
  filters: any = {
    name: '',
    category: '',
    priceMax: null,
    priceMin: null,
    active: null,
  };

  //aplico los filtros y emito el evento
  applyFilters(myFilterForm: NgForm): void {
    //actualizo los valores de 'filters' si es necesario, usando los valores del formulario
    let formValues = myFilterForm.value;

    this.filters.name = formValues.name;
    this.filters.category = formValues.category;
    this.filters.priceMax = formValues.priceMax ? formValues.priceMax : null;
    this.filters.priceMin = formValues.priceMin ? formValues.priceMin : null;
    this.filters.active = formValues.active ? formValues.active.toLowerCase() === "true" : null;

    //emito los filtros actualizados
    this.onFilterChange.emit(this.filters);
  }

  //metodo para borrar los filtros aplicados
  clearFilters(myFilterForm: NgForm): void {
    myFilterForm.resetForm();
    this.filters = {
      name: '',
      category: '',
      priceMax: null,
      priceMin: null,
      active: null,
    };
    this.onFilterChange.emit(this.filters);
  }

}
