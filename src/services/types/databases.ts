
namespace Databases {

  export enum PagesCommands {
    Processes = 'Processes',
    Metrics = 'Metrics',
    ServerOverview = 'ServerOverview',
    DbOverview = 'DbOverview',
    SqlHistory = 'SqlHistory',
    QueryLog = 'QueryLog',
    ClusterOverview = 'ClusterOverview',
  }

  export interface Item {
    id: string;
    name: string;
    category: string;
  }

  export interface Column extends Item {
    table: string;
    database: string;
    type: string;
    dataCompressedBytes: number;
    dataUncompressedBytes: number;
    defaultExpression: string;
    defaultKind: string;
    defaultType: string; // Renamed column 'default_type' to 'default_kind' in system.columns tab… · yandex/ClickHouse@8d570e2
    marksBytes: number;
  }

  export interface Table extends Item {
    insertName: string;
    database: string;
    engine: string;
    size: string;
    columns: ReadonlyArray<Column>;
  }

  export interface Database extends Item {
    tables: ReadonlyArray<Table>;
  }

  export interface SpecialItem extends Item {
    command: Databases.PagesCommands;
  }

  export interface Cluster {
    hostAddress: string;
    port: string;
  }

  export interface SpecialGroupItem extends Item {
    type: string;
    children: ReadonlyArray<SpecialItem>;
  }

  export class Server implements Item {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly category: string,
      public readonly databases: ReadonlyArray<Database>,
      // public readonly clusters: ReadonlyArray<Cluster>,
      // public readonly functions: ReadonlyArray<any>,
      // public readonly dictionaries: ReadonlyArray<any>,
      // public readonly editorRules: Record<string, any>
    ){
      return Object.freeze(this)
    }
  }

  export function isServer(
    item: Server | Table | Column | Database
  ): item is Server {
    // return !!(item as Server).databases;
    // console.log('item.....', item)
    return item.category === 'servers'
  }

  export function isDatabase(
    item: Server | Table | Column | Database | SpecialItem | SpecialGroupItem
  ): item is Database {
    // return !(item as Table).database && !(item as Column).table && !!(item as Database).tables;
    return item.category === 'databases'
  }

  export function isTable(
    item: Server | Table | Column | Database | SpecialItem | SpecialGroupItem
  ): item is Table {
    // return !!(item as Table).database && !!(item as Table).columns;
    return item.category === 'tables'
  }

  export function isColumn(
    item: Server | Table | Column | Database | SpecialItem | SpecialGroupItem
  ): item is Column {
    return !!(item as Column).table && !!(item as Column).database;
  }

}
export default Databases;
