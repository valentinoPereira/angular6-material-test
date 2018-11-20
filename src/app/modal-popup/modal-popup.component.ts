import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatTableDataSource,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import { DialogData } from '../interfaces/dialog-data';
import { startWith, map } from 'rxjs/operators';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {
  INVOICE_DATA: Array<any>;
  options = ['customer 1', 'customer 2', 'customer 3', 'customer 4'];
  products = ['product 1', 'product 2', 'product 3', 'product 4'];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  displayedColumns: string[] = [
    'sr_no',
    'product',
    'rate',
    'quantity',
    'amount',
    'delete'
  ];

  dataSource: MatTableDataSource<any>;
  invoice: any = {};
  totalQuantity = 0;
  totalAmount = 0;
  editMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private provider: DataProviderService
  ) {
    this.INVOICE_DATA = [];
    this.editMode = false;

    if (this.data) {
      console.log('Populating modal data');
      this.invoice.invoice_date = new Date(this.data.date);
      this.invoice.invoice_customer = this.data['customer'];
      this.invoice.invoice_number = this.data['invoice_number'];

      this.data['data'].forEach(item => {
        this.INVOICE_DATA.push({
          sr_no: item.sr_no,
          product: item.product,
          rate: item.rate,
          quantity: item.quantity,
          amount: item.amount,
          // productControl: new FormControl()
        });
      });

      this.editMode = true;
    } else {
      this.INVOICE_DATA = [
        {
          sr_no: '',
          product: '',
          rate: '',
          quantity: '',
          amount: '',
          // productControl: new FormControl()
        }
      ];
    }
    this.refreshTableData();
    // this.INVOICE_DATA[0][
    //   'filteredProducts'
    // ] = this.INVOICE_DATA[0].productControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value: any) => this._filter(this.products, value))
    // );
  }

  filterProducts(element) {
    element.filteredProducts = this._filter(this.products, element.product);
  }

  ngOnInit() {
    console.log('Data received in modal : ', this.data);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.options, value))
    );
  }

  private _filter(array: any, value: string): string[] {
    const filterValue = value.toLowerCase();
    return array.filter(option => option.toLowerCase().includes(filterValue));
  }

  deleteParticular(element, index) {
    console.log(index);
    this.INVOICE_DATA.splice(index, 1);
    this.refreshTableData();
  }

  addParticular() {
    this.INVOICE_DATA.push({
      sr_no: '',
      product: '',
      rate: '',
      quantity: '',
      amount: '',
      // productControl: new FormControl()
    });

    // this.INVOICE_DATA[this.INVOICE_DATA.length - 1][
    //   'filteredProducts'
    // ] = this.INVOICE_DATA[
    //   this.INVOICE_DATA.length - 1
    // ].productControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value: any) => this._filter(this.products, value))
    // );
    this.refreshTableData();
  }

  refreshTableData() {
    this.dataSource = new MatTableDataSource(this.INVOICE_DATA);
  }

  saveInvoice() {
    // console.log(this.INVOICE_DATA);
    // console.log(this.invoice);

    this.INVOICE_DATA.map(invoice => {
      this.totalQuantity = this.totalQuantity + parseInt(invoice.quantity, 10);
      this.totalAmount = this.totalAmount + parseInt(invoice.amount, 10);
    });

    if (this.editMode) {
      this.provider.ELEMENT_DATA.forEach(element => {
        if (element.invoice_number === this.invoice.invoice_number) {
          element.date = this.invoice.invoice_date + '';
          element.customer = this.invoice.invoice_customer;
          element.invoice_number = this.invoice.invoice_number;
          element.totalQuantity = this.totalQuantity;
          element.totalAmount = this.totalAmount;
          element.data = this.INVOICE_DATA;
        }
      });
    } else {
      this.provider.ELEMENT_DATA.push({
        date: this.invoice.invoice_date + '',
        customer: this.invoice.invoice_customer,
        invoice_number: this.invoice.invoice_number,
        totalQuantity: this.totalQuantity,
        totalAmount: this.totalAmount,
        data: this.INVOICE_DATA
      });
    }

    console.log(this.provider.ELEMENT_DATA);

    this.provider.save();
    this.dialogRef.close(this.provider.ELEMENT_DATA);
  }

  rateChange(element) {
    if (
      (element.rate || element.rate === 0) &&
      (element.quantity || element.quantity === 0)
    ) {
      element.amount = parseInt(element.rate, 10) * parseInt(element.quantity, 10);
      this.refreshTableData();
    }
  }

  quantityChange(element) {
    if (
      (element.rate || element.rate === 0) &&
      (element.quantity || element.quantity === 0)
    ) {
      element.amount = parseInt(element.rate, 10) * parseInt(element.quantity, 10);
      this.refreshTableData();
    }
  }
}
