



export type TypedNode = Node & { children?: TypedNode[] } & (
  | Databases.Database
  | Databases.Table
  | Databases.Column
  );

