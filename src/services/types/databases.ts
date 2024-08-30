
namespace Databases {
  export interface Item {
    id: string,
    name: string;
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

  export interface Cluster {
    hostAddress: string;
    port: string;
  }

  export class Server implements Item {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly databases: ReadonlyArray<Database>,
      public readonly clusters: ReadonlyArray<Cluster>,
      public readonly functions: ReadonlyArray<any>,
      public readonly dictionaries: ReadonlyArray<any>,
      public readonly editorRules: Record<string, any>
    ){
      return Object.freeze(this)
    }
  }

  export function isServer(
    item: Server | Table | Column | Database
  ): item is Server {
    return !!(item as Server).databases;
  }

}
export default Databases;
