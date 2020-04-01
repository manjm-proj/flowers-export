import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Transaction } from './../dashboard-component/dashboard-component.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({ templateUrl: './dialog.component.html' })
export class DialogComponent implements OnInit{

  mode: string;
  title: string;
  dataValue: Transaction;
  isAdd: boolean;
  private formbuilder = new FormBuilder();
  register: FormGroup;
  canDisplay = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.mode = data['mode'];
      this.title = data['title'];
      this.dataValue = data['dataValue'];
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  options: string[] = ['காட்டு மல்லி', 'சம்பங்கி', 'மல்லி'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.isAdd = (this.mode === 'Add') ? true : false;
    this.register = this.formbuilder.group({
      number: [this.dataValue.number],
      date:[{value: new Date(this.dataValue.date), disabled: !this.isAdd}],
      details:[{value: this.dataValue.details, disabled: !this.isAdd}],
      weight: [{value: this.dataValue.weight, disabled: false}],
      price: [{value: this.dataValue.price, disabled: false}],
      income: [{value: this.dataValue.price*this.dataValue.weight, disabled: true}],
      pattru: [{value: 0, disabled: true}]
    });
    this.filteredOptions = this.register.get('details').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.handleValueChange();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private handleValueChange() {
    this.register.get('weight').valueChanges.subscribe(value => {
      this.register.get('income').setValue(this.register.get('weight').value * this.register.get('price').value);
    });
    this.register.get('price').valueChanges.subscribe(value => {
      this.register.get('income').setValue(this.register.get('weight').value * this.register.get('price').value);
    });
  }

}