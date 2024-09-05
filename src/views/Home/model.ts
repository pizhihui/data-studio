




export enum TabsPageType {
  None = '',
  metadata = 'metadata',
  terminal = 'terminal',
  project = 'project'
}

export enum TabsPageSubType {
  flinkSql = 'FlinkSql',
  flinkJar = 'FlinkJar',
  None = ''
}
export type TreeVo = {
  name: string;
  value: string;
  children?: TreeVo[];
};
