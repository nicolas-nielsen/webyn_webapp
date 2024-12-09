export interface Row {}

export interface Column {
  name: string,
  data: string,
  filterable?: boolean,
}

export interface Config {
  columns: Array<Column>
}
