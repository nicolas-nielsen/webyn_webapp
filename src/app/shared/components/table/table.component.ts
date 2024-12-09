import {Component, Input } from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Config, Row, Column } from './table.type';

@Component({
  selector: 'app-table',
  imports: [NgFor, NgIf, FormsModule, NgOptimizedImage],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() config: Config = { columns: [] };
  @Input() rows: Array<Object> = [];

  filters: Array<any> = [];
  showFilter: boolean = false;
  isFiltered: boolean = false;

  getRowData(row: Row, column: Column): any {
    return row[column.data as keyof Row];
  }

  getFilteredRows() {
    return this.rows.filter(row => {
      return this.filters.every(filter => {
        const rowData: any = row[filter.data as keyof Row];
        if (typeof rowData === 'string') {
          return rowData.includes(filter.value);
        } else if (typeof rowData === 'number') {
          return rowData > Number(filter.value);
        }
        return true;
      });
    });
  }

  getFilterValue(column: Column) {
    return this.filters.find(filter => filter.data === column.data)?.value ?? '';
  }

  setFilters(data: string, event: any) {
    this.isFiltered = true;
    this.showFilter = false;
    if (this.filters.find(filter => filter.data === data)) {
      this.filters.map(filter => filter.data === data ? filter.value = event.target.value : filter.value);

      return;
    }

    this.filters.push({data: data, value: event.target.value});

  }

  resetFilters(){
    this.filters = [];
    this.isFiltered = false;
    this.showFilter = false;
  }
}
