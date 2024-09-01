import { Node } from 'react-virtualized-tree';
import {Databases} from "@/services";

type TypedNode = Node & { children?: TypedNode[] };

type TypeNodeTable = Node & { children?: TypedNode[] };

type TypeNodeDb = Node & { children?: TypedNode[] };

type TypeNodeNew = Databases.Server & { children?: TypeNodeDb[] };

const treeNodes:  Array<any> = [
  {
    id: 'root', name: 'dev1',state: {expanded: true},
    category: 'servers',
    databases: [
      {
        id: 'db1', name: 'db1',category: 'databases',state: {expanded: true},
        tables: [
          {
            id: 'db1-t001', name: 'db1-table01',category: 'tables',
          },
          {
            id: 'db1-t001', name: 'db1-table01',category: 'tables',
          }
        ],
        children: [
          {
            id: 'db1-t001', name: 'db1-table01',category: 'tables',
          },
          {
            id: 'db1-t001', name: 'db1-table01',category: 'tables',
          }
        ]
      },
      {
        id: 'db2', name: 'db2',category: 'databases',state: {expanded: true},
        tables: [
          {
            id: 'db2-t001', name: 'db2-t001',category: 'tables',
          },
          {
            id: 'db2-t002', name: 'db2-t002',category: 'tables',
          }
        ],
        children: [
          {
            id: 'db2-t001', name: 'db2-t001',category: 'tables',
          },
          {
            id: 'db2-t002', name: 'db2-t002',category: 'tables',
          }
        ]
      }
    ],
    children: [
      {
        id: 'db1', name: 'db1',category: 'databases',state: {expanded: true},
        children: [
          {
            id: 'db1-t001', name: 'db1-table01',category: 'tables',
          },
          {
            id: 'db1-t001', name: 'db1-table01',category: 'tables',
          }
        ]
      },
      {
        id: 'db2', name: 'db2',category: 'databases',state: {expanded: true},
        children: [
          {
            id: 'db2-t001', name: 'db2-t001',category: 'tables',
          },
          {
            id: 'db2-t002', name: 'db2-t002',category: 'tables',
          }
        ]
      }
    ]
  },
  {
    id: 'root2',
    name: 'dev2',
    category: 'servers',
    children: [

    ]
  }
]


export const Nodes2 = treeNodes;
