import React from "react";
import Split from "@uiw/react-split";
import SqlEditor from "@/components/EditorTabPage/SqlEditor/SqlEditor";
import { ActionType as EditorActionType } from './SqlEditor/Toolbar';
import {Databases} from "@/services";

import { Nodes2 } from '@/views/Home/components/TreeContainer/VirtualizedTree/treeData2'


const EditorTabPage: React.FC = () => {


  const content = 'select * from hellow owlr\n' +
    'select * from hellow owlr\n' +
    'select * from hellow owlrselect * from hellow owlrselect * from hellow owlr\n' +
    'select * from hellow owlr\n' +
    'select * from hellow owlr\n' +
    'select * from hellow owlr\n' +
    'select * from hellow owlrselect * from hellow owlr\n' +
    'select * from hellow owlr\n' +
    'select * from hellow owlr\n' +
    'select * from hellow owlr'

  const onEditorAction = (action: EditorActionType, eventData?: any) => {
    switch (action) {
      case EditorActionType.Save: {
        // const { store } = this.props;
        // store.showSaveModal();
        break;
      }
      case EditorActionType.Fullscreen:
        break;
      case EditorActionType.RunCurrent:
      case EditorActionType.RunAll: {
        // const { store } = this.props;
        // store.execQueries(eventData);
        break;
      }
      default:
        break;
    }
  };

  const onDatabaseChange = (db: Databases.Database) => {
    // this.props.onModelFieldChange({ name: 'currentDatabase', value: Option.of(db.name) });
    console.log('onDatabaseChange', db);
  };

  const onContentChange = (content: string) => {
    // this.props.onModelFieldChange({ name: 'content', value: content });
    // console.log('onContentChange', content);
  };

  const currentDatabase = 'db1';

  return (
    <React.Fragment>
      <Split mode="vertical"
             style={{
               border: '1px solid #d5d5d5',
               borderRadius: 3,
               height: 500
             }}>
        <div style={{ height: '50%' }}>
          <SqlEditor
            content={content}
            onContentChange={onContentChange}
            // @ts-ignore
            serverStructure={Nodes2[0]}
            currentDatabase={currentDatabase}
            onDatabaseChange={onDatabaseChange}
            onAction={onEditorAction}
            // stats={model.queriesResult.map((_) => _.totalStats).orUndefined()}
            // ref={this.setEditorRef}
            fill
          />
        </div>
        <div style={{ height: '50%' }}>
          table
        </div>
      </Split>

    </React.Fragment>
  )
}

export default EditorTabPage


