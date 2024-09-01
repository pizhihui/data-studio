import monacoEditor from 'monaco-editor';

export interface QuerySettings {
  format: string;
  tokens: any | null; // splitRange['tokens']
  isExecutable: boolean;
  isFormatSet: boolean;
  range: monacoEditor.Range | null;
  inCursor: boolean;
  inSelected: boolean;
  numQuery: number;
  numCommand: number;
  commands: Array<TabixCommand> | null;
  // showProgressQuery: string;
  isOperationCAD: boolean; // CreateAlterDrop
  variables: Array<Variable> | null;
  extendSettings: any | undefined;
  currentDatabase: string | undefined;
}

export class Query {
  public id: string;
  public sql: string;
  public sqlOriginal: string;

  public settings: QuerySettings;

  // @ts-ignore
  constructor(sql: string, id: string | null = null) {
    this.id = id ?? 'ID1';
    this.sql = sql;
    this.sqlOriginal = sql;
    this.settings = {
      isFormatSet: false,
      currentDatabase: undefined,
      extendSettings: undefined,
      variables: null,
      isOperationCAD: false,
      // showProgressQuery: '',
      commands: null,
      numCommand: 0,
      numQuery: 0,
      inSelected: false,
      inCursor: false,
      range: null,
      isExecutable: false,
      tokens: null,
      format: '',
    };
  }
  // @ts-ignore
  public setId(id: string): void {
    this.id = id;
  }
  // @ts-ignore
  public getSQL(): string {
    // @ts-ignore
    const format =
      // @ts-ignore
      this.settings.format && !this.settings.isFormatSet ? ` FORMAT ` + this.settings.format : '';
    // @ts-ignore
    const id = `/*TABIX_QUERY_ID_${this.id}*/`;
    return this.sql + `\n\n${format}\n\n${id}`;
  }

  // @ts-ignore
  public setJsonFormat(): void {
    this.settings.format = 'JSON';
    this.settings.isFormatSet = false;
  }
}

export interface Response {
  query: Query;
  statistics: any | null;
  data: any | null;
  error: boolean;
  rows: number | null;
  meta: any | null;
  time: string;
}

export interface TabixCommand {
  type: string;
  text: string;
}

export interface Variable {
  name: string;
  value: string;
}
