import { Component } from '@angular/core';
import PageRepository from 'api/webynApi/page/pageRepository';
import { TableComponent } from 'shared/components/table/table.component';
import { Page } from 'types/page/page.type';
import { Config } from 'shared/components/table/table.type';

@Component({
  selector: 'app-traffic',
  imports: [TableComponent],
  templateUrl: './traffic.component.html',
  styleUrl: './traffic.component.scss'
})
export class TrafficComponent {
  constructor(private pageRepository: PageRepository) {
  }

  config: Config = {columns: [{name: 'page URL', data: 'page_url'}, {name: 'Traffic count', data: 'traffic', filterable: true}]}
  rows: Array<Page> = []

  ngOnInit(): void {
    this.pageRepository.getTraffic().subscribe((data: Page[]): void => {
      this.rows = data
    });
  }
}
