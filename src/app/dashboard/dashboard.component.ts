import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { DataProviderService } from '../data-provider.service';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: Array<string>;
  listDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private provider: DataProviderService) {
    this.displayedColumns = [
      'id',
      'date',
      'customer.name',
      'totalQuantity',
      'totalAmount',
      'Edit',
      'Delete'
    ];
    this.listDataSource = new MatTableDataSource(this.provider.ELEMENT_DATA);
  }

  ngOnInit() {
    this.listDataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.listDataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id) {
    console.log(id);
  }

  edit(data) {
    console.log(data);

    const dialogRef = this.dialog.open(ModalPopupComponent, {
      width: '900px',
      data: data,
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalPopupComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listDataSource = new MatTableDataSource(result);
        this.listDataSource.paginator = this.paginator;
      }
    });
  }
}
