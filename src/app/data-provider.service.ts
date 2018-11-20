import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  public ELEMENT_DATA = [];

  constructor() {
    this.get();
  }

  save() {
    let tempData = this.ELEMENT_DATA;

    tempData = tempData.map(item => {
      item.data = item.data.map(innerItem => {
        delete innerItem['filteredProducts'];
        delete innerItem['productControl'];
        return innerItem;
      });

      return item;
    });

    localStorage.setItem('data', JSON.stringify(tempData));
  }

  get() {
    this.ELEMENT_DATA = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
  }
}
