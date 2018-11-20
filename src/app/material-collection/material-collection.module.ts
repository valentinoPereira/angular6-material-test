import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule
} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    NavbarComponent,
    DashboardComponent,
    TableComponent,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [NavbarComponent, DashboardComponent, TableComponent]
})
export class MaterialCollectionModule {}
