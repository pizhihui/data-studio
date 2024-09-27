import { DatabaseTwoTone, TableOutlined } from '@ant-design/icons';
import { folderSeparator, searchTreeNode } from '@/utils/functions.tsx'

/**
 *  build schema tree
 * @param data
 * @param searchValue
 */
export const buildSchemaTree = (data: any, searchValue = ''): any =>
  data.map((item: any) => {
    // console.log('itemxxxxx', item)
    return {
      isLeaf: false,
      name: item.name,
      parentId: item.name,
      icon: <DatabaseTwoTone />,
      content: item.name,
      path: item.name,
      title: item.name,
      fullInfo: item,
      key: item.name,
      children: item.tables?
        // filter table by search value and map table to tree node
        item.tables //.filter((table: any) => table.name.indexOf(searchValue) > -1)
        .map((table: any) => {
          console.log('tablesxxxxxx', table)
          return {
            isLeaf: true,
            name: table.name,
            parentId: item.name,
            icon: <TableOutlined />,
            content: table.name,
            path: item.name + '/' + table.name,
            title: table.name,
            key: item.name + '/' + table.name,
            fullInfo: table
          };
        }): []
    };
  });
