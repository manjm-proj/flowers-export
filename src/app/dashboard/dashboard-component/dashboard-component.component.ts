import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DATA } from './../data/mock-data';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogComponent } from './../../../../../../../create-project/src/app/confirm-dialog/confirm-dialog.component';

export interface Transaction {
  number: number;
  date: string;
  details: string;
  weight: number;
  price: number;
  income?: number;
  pattru: number;
}

@Component({
  templateUrl: './dashboard-component.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit{
  title = 'புல்லன்விடுதி';
  @ViewChild(MatTable, {static: false}) table : MatTable<Transaction[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = [ 'date', 'details', 'weight', 'price', 'income', 'pattru', 'actions'];
  transactions: Transaction[] = DATA;
  datasource: MatTableDataSource<Transaction>;
  actionButtonLabel: string = 'நீக்கு';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  nowdate = new Date();
  monthStartDay = new Date(this.nowdate.getFullYear(), this.nowdate.getMonth(), 1);
  monthEndDay = new Date(this.nowdate.getFullYear(), this.nowdate.getMonth() + 1, 0);

  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar) {}

  ngOnInit() {
      this.datasource = new MatTableDataSource(DATA);
      this.datasource.paginator = this.paginator;
  }

  openAddDialog(): void {
    let dataValue = {} as Transaction;
    dataValue.date = new Date().toDateString();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {mode: 'Add', dataValue: dataValue, title:"புதிய விவரங்களைச் சேர்க்க"}
    });

    dialogRef.afterClosed().subscribe( (result: Transaction) => {
      let addedData = result;
      addedData.number = this.transactions.length + 1;
      addedData.date = new Date(addedData.date).toDateString();
      addedData.income = addedData.weight*addedData.price;
      addedData.pattru = 0;
      //this.transactions.push(addedData);
      this.datasource.data.push(addedData);
      this.table.renderRows();
      this.openSnackBar("வெற்றிகரமாக சேர்க்கப்பட்டது!");
    });
  }

  openEditDialog(data: Transaction) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {mode: 'edit', dataValue: data, title:"விவரங்களைத் திருத்த"}
    });

    dialogRef.afterClosed().subscribe((result: Transaction) => {
      this.transactions.forEach(value => {
        if(value.number === result.number) {
          value.income = result.weight * result.price;
          value.weight = result.weight;
          value.price = result.price;
          this.table.renderRows();
          this.openSnackBar("வெற்றிகரமாக திருத்தப்பட்டது!");
        }
      });
    });
  }

  getTotalWeight() {
    let totalWeight: number = 0;
    this.transactions.forEach(t =>  totalWeight += t.weight);
    return totalWeight;
  }

  getTotalCost() {
    return this.transactions.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  getTotalIncome() {
    return this.transactions.map(t => t.weight*t.price).reduce((acc, value) => acc + value, 0);
  }

  openSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this._snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  openConfirmDialog(dataValue: Transaction): void {
    const message = `இதை நீக்க விரும்புகிறீர்களா?`;
    const dialogData = new ConfirmDialogModel("உறுதிப்படுத்தல்", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult) {
        let data = [...this.datasource.data];
        data = data.filter((value: Transaction) => value.number !== dataValue.number);
        this.datasource.data = data;
        this.table.renderRows();
        this.openSnackBar("வெற்றிகரமாக நீக்கப்பட்டது!");
      }
    });
  }

}
